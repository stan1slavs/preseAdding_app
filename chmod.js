const fs = require('fs');
const path = require('path');

const folderPath = 'files/presentation';


const returnName = (pathItem) => {
	if(path.extname(pathItem) == ".ppsx") {
	// if(path.extname(pathItem) == ".pptx" || path.extname(pathItem) == ".ppt") {
		const re = new RegExp('^[+!][^-]+[ р-џР-п]')
		// if( re.test(path.basename(pathItem)) ){
			return `<div style="display: flex;justify-content: space-between;">
			<a target='_blank' href='../${pathItem}' class='gost-text'>${path.basename(pathItem).split('.').slice(0, -1).join('.')}</a>
			<div style="cursor: pointer;display: none;" data-name="daletePresent">x</div>
			</div>
			`
		// }
	}
}

fs.readdirSync(folderPath).forEach(folder => {
	const folderFullPath = path.join(folderPath, folder);
	fs.chmodSync(folderFullPath, 0o777);
	// const folderName = folder.replace(/[^Р-пр-џ -]+/g,'')
	// let mainItem = `<div class="gost__content">
  //          			<div class="gost__main-item">
  //                 <p class="gost__main-text">${folderName.replace(/([^Р-пр-џ])-([^Р-пр-џ])+/g,'')}</p>
  //                 <a onclick="return false" href="" class="gost__btn">
  //                   <span class="gost__btn-svg">
  //                     <svg width="28" height="29" viewBox="0 0 28 29" fill="none">
  //                       <use xlink:href="../img/sprite.svg#plus2"></use>
  //                     </svg>
  //                   </span>
  //                 </a>
  //               </div>
  //               <div class="gost__item">
  //                 <div class="gost__item-text">
                  // `
	// fs.readdirSync(path.join(folderPath, folder)).map(fileOrFolderA => {
	// 	if(fs.lstatSync(path.join(folderPath, folder, fileOrFolderA)).isFile()) {
	// 		// fs.renameSync(path.join(folderPath, folder, fileOrFolderA), path.join(folderPath, folder, fileOrFolderA));
	// 		const smallItem = returnName(path.join(folderPath, folder, fileOrFolderA))
	// 		mainItem += smallItem ? smallItem : ''
	// 	}
	// 	else {
	// 		fs.readdirSync(path.join(folderPath, folder, fileOrFolderA)).map(fileOrFolderAA => {
	// 			if(fs.lstatSync(path.join(folderPath, folder, fileOrFolderA, fileOrFolderAA)).isFile()) {
	// 				// fs.renameSync(path.join(folderPath, folder, fileOrFolderA, fileOrFolderAA), path.join(folderPath, folder, fileOrFolderAA));
	// 				const smallItem = returnName(path.join(folderPath, folder, fileOrFolderAA))
	// 				mainItem += smallItem ? smallItem : ''
	// 			}
	// 			else {
	// 				fs.readdirSync(path.join(folderPath, folder, fileOrFolderA, fileOrFolderAA)).map(fileOnly => {
	// 						// fs.renameSync(path.join(folderPath, folder, fileOrFolderA, fileOrFolderAA, fileOnly), path.join(folderPath, folder, fileOnly));
	// 						const smallItem = returnName(path.join(folderPath, folder, fileOnly))
	// 						mainItem += smallItem ? smallItem : ''
	// 				})
	// 			}
	// 		})
	// 	}
	// })
	// fs.writeFile('verstka.html', mainItem + `</div></div></div>`, { flag: 'a+' }, (err) => {})
	// console.log(mainItem + `</div></div></div>`)
})
