interface DocType {
  title: string;
  titleEn?: string;
  type: string;
  children: DocType[];
}

export function sortDocs(docs: DocType[]): DocType[] {
  let innerDocs: DocType[] = [];
  docs.forEach((item: DocType) => {
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
export function filterVersions(versions = []) {
  const versionMap = new Map();

  versions.forEach((v: string) => {
    if (v.includes('-')) return false;
    const nums = v.split('.');
    versionMap.set(`${nums[0]}.${nums[1]}`, v);
  });

  return [...versionMap.values()].sort(
    (a, b) => Number(a.split('.').slice(0, 2).join('.')) - Number(b.split('.').slice(0, 2).join('.')),
  );
}
