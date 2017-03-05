(function(window){
  function createTableHeader(tableId){
      var tableHeaderRow = document.createElement('TR');
      var th1 = document.createElement('TH');
      var th2 = document.createElement('TH');
      var th3 = document.createElement('TH');
      var th4 = document.createElement('TH');
      th1.appendChild(document.createTextNode("ProductId"));
      th2.appendChild(document.createTextNode("Type"));
      th3.appendChild(document.createTextNode("Price"));
      th4.appendChild(document.createTextNode("Examine"));
      tableHeaderRow.appendChild(th1);
      tableHeaderRow.appendChild(th2);
      tableHeaderRow.appendChild(th3);
      tableHeaderRow.appendChild(th4);
      document.getElementById(tableId).appendChild(tableHeaderRow);
  }

  function updateTable(tableId,productArray){
      var tableBody = document.getElementById(tableId);
      //reset table
      while (tableBody.hasChildNodes()) {
          tableBody.removeChild(tableBody.firstChild);
      }
      //create table header
      createTableHeader(tableId);
      //populate table rows
      for (i = 0; i < productArray.length; i++) {
          var tr = document.createElement('TR');
          var td1 = document.createElement('TD');
          var td2 = document.createElement('TD');
          var td3 = document.createElement('TD');
          var td4 = document.createElement('button');

          td4.addEventListener('click',function(){
            let child = this.parentNode.childNodes
            let results = [];
            for(var i=0; i<child.length -1; i++) {
              results.push(child[i].textContent);
            }

            var examineResults = {
              id: results[0],
              type: results[1],
              price: results[2]
            }

            updateExaminedText(examineResults)

          });
          td1.appendChild(document.createTextNode(productArray[i].id));
          td2.appendChild(document.createTextNode(productArray[i].type));
          td3.appendChild(document.createTextNode(productArray[i].price));
          td4.appendChild(document.createTextNode("Examine"));
          tr.appendChild(td1);
          tr.appendChild(td2);
          tr.appendChild(td3);
          tr.appendChild(td4);
          tableBody.appendChild(tr);
      }
  }

  api.searchAllProducts().then(function(value){
      updateTable('allTable',value);
  });

  function updateExaminedText(product){
      var outputString = "Product Id: " + product.id;
      outputString += "<br> Price: " + product.price;
      outputString += "<br> Type: " + product.type;
      document.getElementById("productText").innerHTML = outputString;
  }

  function getIntersection(arrA,arrB,searchedId){

      var samePrice = arrA;
      var sameType = arrB;
      var similarArray = [];
      samePrice.forEach(function(obj1){ //foreach value in price array
          sameType.forEach(function(obj2){ //check for types
              if(obj1.id == obj2.id && obj1.id != searchedId) //if the same push to similarArray
                  similarArray.push(obj1);
          });
      });

      return similarArray;

  }
  function getIntersectionType(arr,searchedType){
      var sameType = arr;
      var similarArray = [];
      sameType.forEach(function(item){ //check for types
          if(item.type == searchedType) //if the same push to similarArray
              similarArray.push(item);
      });
      return similarArray;
  }
  function getIntersectionPrice(arr){
      var samePrice = arr;
      var similarArray = [];
      samePrice.forEach(function(item){ //check for types
        similarArray.push(item);
      });
      return similarArray;
  }

  function processSearchWithId(searchId){
      api.searchProductById(searchId).then(function(val){
          return Promise.all([api.searchProductsByPrice(val.price,50),api.searchProductsByType(val.type),val]);
      }).then(function(val){
          var similarArray = getIntersection(val[0],val[1],val[2].id);
          updateExaminedText(val[2]);
          updateTable('similarTable',similarArray);
      }).catch(function(val){
          alert(val);
      });
  }
  function processSearchWithType(typeSelected){
    api.searchProductsByType(typeSelected).then(function(val){
        return val;
    }).then(function(val){
        var similarArray = getIntersectionType(val, typeSelected);
        updateTable('similarTable',similarArray);
    }).catch(function(val){
        alert("please select Clothing, Book, Electronics, Food \n" +val);
    });
  }
  function processSearchWithPrice(priceSelected){
    api.searchProductsByPrice(priceSelected, 50).then(function(val){
        return val;
    }).then(function(val){
        var similarArray = getIntersectionPrice(val);
        updateTable('similarTable',similarArray);
    }).catch(function(val){
      alert(val);
    });
  }

  document.getElementById("inputIDSubmit").addEventListener('click',function(){
      processSearchWithId(document.getElementById('inputID').value);
      //processSearchWithId(this.parentNode.firstChild.innerHTML);
  });
  document.getElementById("inputTypeSubmit").addEventListener('click',function(){
      processSearchWithType(document.getElementById('inputType').value);
      //processSearchWithType(this.parentNode.firstChild.innerHTML);
  });
  document.getElementById("inputPriceSubmit").addEventListener('click',function(){
      processSearchWithPrice(document.getElementById('inputPrice').value);
      //processSearchWithPrice(this.parentNode.firstChild.innerHTML);
  });


})();