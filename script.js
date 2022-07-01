const getArt = document.getElementById("getArt");
const art = document.getElementById("art");

async function getMetArt() {
  
try {
  const response = await axios.get(
    "https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=1"
  );
  console.log(response);
      if (response.data.total > 100) {
        let newObjectArr = response.data.objectIDs.slice(0, 50)
        console.log("new Object", newObjectArr);
        newObjectArr.map((item, index) => {
          const i = index
          axios.get(
              `https://collectionapi.metmuseum.org/public/collection/v1/objects/${item}`
            )
            .then(function (response) {
              console.log("each art item", response);
              if (response.data.isPublicDomain === false) {
                console.log(item, "was not public")
                return
              } else {
                const newArtDiv = document.createElement("div");
                const artImg = document.createElement('img')
                artImg.src = response.data.primaryImageSmall
                newArtDiv.appendChild(artImg)
                art.appendChild(newArtDiv)
                
              }
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            });
        })
      }


} catch (error) {
  console.error(error);
}
  
  // await fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=1")
  //   .then((data) => {
  //     // setTimeout(() => {
  //       console.log(data);
        
  //     // }, 2000);
  //   })
}

getArt.addEventListener('click', (e) => {
  e.preventDefault()
  getMetArt()
})