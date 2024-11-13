const fs = require('fs');
const path = require('path');
const folderPath = 'files/presentation';


const deleteFile = (pathItem) => {
	if(path.extname(pathItem) !== ".ppsx") {
		fs.unlink(pathItem, (err) => {
  		if (err) throw err;
  			console.log('gosha pedik');
			})
	}
}

fs.readdirSync(folderPath).map(folder => {
	// let mainItem = `<div class="gost__content">
  //          			<div class="gost__main-item">
  //                 <p class="gost__main-text">${folder.split(' ').slice(0, -1).join(' ')}</p>
  //                 <a onclick="return false" href="" class="gost__btn">
  //                   <span class="gost__btn-svg">
  //                     <svg width="28" height="29" viewBox="0 0 28 29" fill="none">
  //                       <use xlink:href="../img/sprite.svg#plus2"></use>
  //                     </svg>
  //                   </span>
  //                 </a>
  //               </div>
  //               <div class="gost__item">
  //                 <div class="gost__item-text">`
	fs.readdirSync(path.join(folderPath, folder)).map(fileOrFolderA => {
		if(fs.lstatSync(path.join(folderPath, folder, fileOrFolderA)).isFile()) {
			deleteFile(path.join(folderPath, folder, fileOrFolderA))
			// mainItem += smallItem ? smallItem : ''
		}
		else {
			fs.readdirSync(path.join(folderPath, folder, fileOrFolderA)).map(fileOrFolderAA => {
				if(fs.lstatSync(path.join(folderPath, folder, fileOrFolderA, fileOrFolderAA)).isFile()) {
					deleteFile(path.join(folderPath, folder, fileOrFolderA, fileOrFolderAA))
					// mainItem += smallItem ? smallItem : ''
				}
				else {
					fs.readdirSync(path.join(folderPath, folder, fileOrFolderA, fileOrFolderAA)).map(fileOnly => {
							deleteFile(path.join(folderPath, folder, fileOrFolderA, fileOrFolderAA, fileOnly))
							// mainItem += smallItem ? smallItem : ''
					})
				}
			})
		}
	})
	// fs.writeFile('verstka.html', mainItem + `</div></div></div>`, { flag: 'a+' }, (err) => {})
	// console.log(mainItem + `</div></div></div>`)
})
