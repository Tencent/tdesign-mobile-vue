export function sortDocs(docs: any[]){
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