(function(){
    // console.log("Heloor World");
    let btn = document.querySelector("#myButton");
    let h1 = document.querySelector("h1");
    let divContainer = document.querySelector("#container");
    let divBreadCrumb = document.querySelector("#divBreadCrumb");
    let aRootPAth =document.querySelector(".path");
    
    let myTemplate = document.querySelector("#myTemplate");
    let fid = -1;
    let folders =[];
    let cfid =-1;


    // let fjson = localStorage.getItem("data");
    // if(fjson!=null && fjson.length > 0){
    //     folders = JSON.parse(fjson);
    // }
    btn.addEventListener("click",addFolder);
    aRootPAth.addEventListener("click" , navigateBreadCrumb);

    function addFolder(){
        // divContainer.style.border ="2px solid orange";
        let fname = prompt("Enter folder Name");
        if(!!fname){
            let found = folders.some(f=>f.name == fname)
                if(found== false){
                    fid++;
                    folders.push({
                        id: fid,
                        name: fname,
                        pid: cfid
                    });
                    addFolderInPage(fname,fid , cfid);
                    persistFolderToStorage()
                }else{
                    alert(fname +" already exists");
                }
        }else{
            alert("Enter Something");
        }
        // if(fname==null){
        //     return;
        // }
        // fid++;
        // // HTML
        // addFolderInPage(fname , fid)

        // //RAM
        // folders.push({
        //     id: fid,
        //     name: fname
        // });  
        // //Storage
        // persistFolderToStorage();
    }
    function deleteFolder(){
        let divFolderCopy = this.parentNode;
        let spanName = divFolderCopy.querySelector("[purpose='name']");
        let fidtbd = divFolderCopy.getAttribute("fid");

        let flag = confirm("Doy you want to delete folder " + spanName.innerHTML);
        if(flag==true){
            let exists = folders.some(f=>f.pid ==fidtbd);
            if(exists == false){
            divContainer.removeChild(divFolderCopy);
            let idx = folders.findIndex(f=>f.pid == fidtbd);
            folders.splice(idx,1);
            persistFolderToStorage();
            }else{
                alert("Can't delete . Has Children");
            }
        }
    }
    function editFolder(){
        let divFolderCopy = this.parentNode;
        let spanName = divFolderCopy.querySelector("[purpose='name']");
        let ofname = spanName.innerHTML;

        let fname = prompt("Doy you want to edit Folder name ");
        if(!!fname){
            if(fname != ofname){
                let exists = folders.filter(f=> f.pid == cfid).some(f =>f.name == fname );
                if(exists == false){
                    //RAM
                    let folder = folders.filter(f=>f.pid == cfid).find(f =>f.name == ofname);
                    folder.name = fname;
                    //HTML
                    spanName.innerHTML = fname;
                    //STORAGE
                    persistFolderToStorage();
                }else{
                    alert(fname + "Already Exists");
                }
            }else{
                alert("This is same name !! Add New");
            }
        }else{
            alert("Please Enter Name");
        }
        // if(!fname){
        // return;
        // }
        // spanName.innerHTML = fname;
        // let f = folders.find(f=>f.id == parseInt(divFolderCopy.getAttribute("fid")));
        // f.name = fname;
        // persistFolderToStorage();
    }
    function navigateBreadCrumb(){
         let fname = this.innerHTML;
         cfid = parseInt(this.getAttribute("fid"));
        
        divContainer.innerHTML = "";
        folders.filter(f => f.pid == cfid).forEach(f =>{
            addFolderInPage(f.name , f.fid , f.pid)
        })

        while(this.nextSibling){
            this.parentNode.removeChild(this.nextSibling);
        }

    }
    function viewFolder(){
        let divFolderCopy = this.parentNode;
        let spanName = divFolderCopy.querySelector("[purpose='name']");
        cfid = parseInt(divFolderCopy.getAttribute("fid"));

        let aPathTemplate = myTemplate.content.querySelector(".path");
        let aPath = document.importNode(aPathTemplate,true);

        aPath.innerHTML = spanName.innerHTML;
        aPath.setAttribute("fid" ,cfid);
        aPath.addEventListener("click" ,navigateBreadCrumb);
        divBreadCrumb.appendChild(aPath);

        divContainer.innerHTML = "";
        folders.filter(f => f.pid == cfid).forEach(f =>{
            addFolderInPage(f.name , f.fid , f.pid)
        })
    }
    function addFolderInPage(fname , fid ,pid){
        // divContainer.innerHTML = fname; 
        let divFolder = myTemplate.content.querySelector(".folder");
        let divFolderCopy = document.importNode(divFolder,true);

        let spanName = divFolderCopy.querySelector("[purpose='name']");
        spanName.innerHTML = fname;
        divFolderCopy.setAttribute("fid" , fid);
        divFolderCopy.setAttribute("pid" , pid);

        let spanDelete = divFolderCopy.querySelector("span[action='delete']");
        spanDelete.addEventListener("click",deleteFolder )
        let spanEdit = divFolderCopy.querySelector("span[action='edit']");
        spanEdit.addEventListener("click", editFolder);

        let spanView = divFolderCopy.querySelector("span[action='view']");
        spanView.addEventListener("click", viewFolder);
        divContainer.appendChild(divFolderCopy);
        
    }
    function persistFolderToStorage(){
        let fjson = JSON.stringify(folders);
        localStorage.setItem("data" , fjson);
    }
    function loadFolderFromStorage(){
        let fjson = localStorage.getItem("data");
        if(!!fjson){
        folders = JSON.parse(fjson);
        folders.forEach(f=>{
            if(f.id> fid){
                fid= f.id;
            }
            
            if(f.pid === cfid){
                addFolderInPage(f.name , fid);
            }
           
        });
        }
    }
    loadFolderFromStorage();

//     btn.addEventListener("click", function(){
//         h1.style.color = "green";
//     });

//    h1.addEventListener("mouseover", function(){
//         h1.style.color ="blue";
//     })
//     btn.addEventListener("mouseout", function(){
//         h1.style.color = "aqua";
//     })
//     h1.addEventListener("mouseout", function(){
//         h1.style.color = "aqua";
//     })




})();