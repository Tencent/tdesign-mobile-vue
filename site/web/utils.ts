export function sortDocs(docs: any[]) {
  let innerDocs = [];
  docs.forEach((item) => {
    let { children } = item;
    if (item.type === 'component') {
      children = item.children.sort((a: any, b: any) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
    }
    if (children) {
      item.children = sortDocs(children);
    }
    innerDocs.push(item);
  });
  return innerDocs;
}

// 过滤小版本号
export function filterVersions(versions = [], deep = 1) {
  const versionMap = Object.create(null);

  versions.forEach((v) => {
    const nums = v.split('.');
    versionMap[nums[deep]] = v;
  });

  return Object.values(versionMap);
}
