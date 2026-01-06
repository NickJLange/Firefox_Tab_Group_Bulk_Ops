/* global browser */

let collapsed = true;

function getBaseDomain(hostname) {
  const parts = hostname.split(".");
  if (parts.length <= 2) return hostname;
  // Handle co.uk, com.au etc
  const secondToLast = parts[parts.length - 2];
  if (["co", "com", "org", "net", "gov", "edu"].includes(secondToLast) && parts.length > 2) {
    return parts.slice(-3).join(".");
  }
  return parts.slice(-2).join(".");
}

async function grpTabsBySite(all_tabs, sites, useBaseDomain = false) {
  const siteMap = new Map();

  sites.forEach((site) => {
    const key = useBaseDomain ? getBaseDomain(site) : site;
    if (!siteMap.has(key)) {
      siteMap.set(key, []);
    }
    const tabIds = all_tabs
      .filter((t) => {
        const turl = new URL(t.url);
        const tKey = useBaseDomain ? getBaseDomain(turl.hostname) : turl.hostname;
        return tKey === key;
      })
      .map((t) => t.id);

    siteMap.set(key, [...new Set([...siteMap.get(key), ...tabIds])]);
  });

  // Sort sites alphabetically before creating groups
  const sortedSites = Array.from(siteMap.entries()).sort((a, b) => a[0].localeCompare(b[0]));

  for (const [site, tabIds] of sortedSites) {
    if (tabIds.length < 2) continue; // Only group if 2+ tabs
    const grpId = await browser.tabs.group({ tabIds });

    let title = site.startsWith("www.") ? site.slice(4) : site;
    browser.tabGroups.update(grpId, {
      title,
      collapsed,
    });
  }
}

async function grpSingleSite(site, useBaseDomain = false) {
  const all_tabs = await browser.tabs.query({
    currentWindow: true,
    pinned: false,
    hidden: false,
  });
  grpTabsBySite(all_tabs, [site], useBaseDomain);
}

async function grpSelectedSites(useBaseDomain = false) {
  const all_tabs = await browser.tabs.query({
    currentWindow: true,
    pinned: false,
    hidden: false,
  });

  const sites = new Set(
    all_tabs
      .filter((t) => t.highlighted && t.url.startsWith("http"))
      .map((t) => new URL(t.url).hostname),
  );

  grpTabsBySite(all_tabs, [...sites], useBaseDomain);
}

async function grpAllSites(useBaseDomain = false) {
  const all_tabs = await browser.tabs.query({
    currentWindow: true,
    pinned: false,
    hidden: false,
  });

  const sites = new Set();
  all_tabs.forEach((t) => {
    if (typeof t.url === "string" && t.url.startsWith("http")) {
      sites.add(new URL(t.url).hostname);
    }
  });

  grpTabsBySite(all_tabs, [...sites], useBaseDomain);
}

async function ungroupAll() {
  const all_tabs = await browser.tabs.query({
    currentWindow: true,
  });
  const tabIds = all_tabs.filter((t) => t.groupId !== -1).map((t) => t.id);
  if (tabIds.length > 0) {
    browser.tabs.ungroup(tabIds);
  }
}

async function sweepUpOrphanedTabs() {
  const all_tabs = await browser.tabs.query({
    currentWindow: true,
    pinned: false,
    hidden: false,
  });
  const orphanedTabIds = all_tabs.filter((t) => t.groupId === -1).map((t) => t.id);
  if (orphanedTabIds.length > 1) {
    const grpId = await browser.tabs.group({ tabIds: orphanedTabIds });
    browser.tabGroups.update(grpId, {
      title: "Orphaned",
      collapsed,
    });
  }
}

browser.menus.create({
  id: "grp-selected",
  title: "Selected Sites",
  contexts: ["tab"],
  onclick: async (clickdata, atab) => {
    collapsed = clickdata.button !== 1;
    if (!atab.highlighted) {
      grpSingleSite(new URL(atab.url).hostname);
    } else {
      grpSelectedSites();
    }
  },
});

browser.menus.create({
  id: "grp-selected-base",
  title: "Selected Sites (Base Domain)",
  contexts: ["tab"],
  onclick: async (clickdata, atab) => {
    collapsed = clickdata.button !== 1;
    if (!atab.highlighted) {
      grpSingleSite(new URL(atab.url).hostname, true);
    } else {
      grpSelectedSites(true);
    }
  },
});

browser.menus.create({
  id: "grp-all",
  title: "All Sites",
  contexts: ["tab"],
  onclick: async (clickdata) => {
    collapsed = clickdata.button !== 1;
    grpAllSites();
  },
});

browser.menus.create({
  id: "grp-all-base",
  title: "All Sites (Base Domain)",
  contexts: ["tab"],
  onclick: async (clickdata) => {
    collapsed = clickdata.button !== 1;
    grpAllSites(true);
  },
});

browser.menus.create({
  id: "ungroup-all",
  title: "Ungroup All",
  contexts: ["tab"],
  onclick: async () => {
    ungroupAll();
  },
});

browser.menus.create({
  id: "sweep-orphaned",
  title: "Sweep up Orphaned Tabs",
  contexts: ["tab"],
  onclick: async (clickdata) => {
    collapsed = clickdata.button !== 1;
    sweepUpOrphanedTabs();
  },
});

browser.browserAction.onClicked.addListener((tab, clickdata) => {
  collapsed = clickdata.button !== 1;
  grpAllSites();
});

browser.commands.onCommand.addListener((cmd) => {
  switch (cmd) {
    case "group-all":
      collapsed = true;
      grpAllSites();
      break;
    case "group-selected":
      collapsed = true;
      grpSelectedSites();
      break;
    case "group-all-uncollapsed":
      collapsed = false;
      grpAllSites();
      break;
    case "group-selected-uncollapsed":
      collapsed = false;
      grpSelectedSites();
      break;
    case "group-all-base":
      collapsed = true;
      grpAllSites(true);
      break;
    case "group-selected-base":
      collapsed = true;
      grpSelectedSites(true);
      break;
    case "ungroup-all":
      ungroupAll();
      break;
    default:
      break;
  }
});
