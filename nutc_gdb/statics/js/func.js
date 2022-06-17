var graphData = { datas: [] };
var cy;
var tmp_selectedNode;
var rightClickedTarget;

//var nodeSteps=[]

//document 事件
$(document).ready(function () {
  $("#loading").hide();
  $("#cy-floating-window").hide();

  $("#cy").on("click", () => {
    //取消所有特效
    console.log("CY Click");
    cy.elements().removeClass("semitransp");
    cy.elements().removeClass("highlight");

    rightClickedTarget = null;
    console.log(tmp_selectedNode);
    
    if (tmp_selectedNode != null) {
      //currentSelectedNode.addClass("highlight").outgoers().addClass("highlight"); //有關聯的都加特效
      tmp_selectedNode.addClass("highlight"); // 只加自己
      cy.elements()
        .difference(tmp_selectedNode.outgoers())
        .not(tmp_selectedNode)
        .addClass("semitransp");
      console.log(cy.$(".highlight"));
    }
    tmp_selectedNode = null;
  });
});

//創建圖
function SetScape(data) {
  //console.log(...data.datas);
  //const randomColor = "#"+Math.floor(Math.random()*16777215).toString(16);
  if (cy) {
    //cytoscape.removeRegistrationForInstance(cy)
    cy.elements().remove();
    cy.unbind("click");
    cy.unbind("cxttap");
  }
  graphData = { datas: [...graphData.datas, ...data.datas] };
  console.log(graphData);
  cy = cytoscape({
    container: document.getElementById("cy"),
    style: [
      {
        selector: "node",
        css: {
          label: "data(name)", //access the nodes data with "data(...)"
          id: "data(id)",
          "text-valign": "center",
          "text-halign": "center",
          shape: "roundrectangle",
          width: "label",
          height: "label",
          "background-color": "data(faveColor)",
        },
      },
      {
        selector: "edge",
        css: {
          label: "data(name)",
          id: "data(id)",
          "curve-style": "bezier",
          "control-point-step-size": 40,
          "target-arrow-shape": "triangle",
          "line-color": "data(faveColor)",
        },
      },
      {
        selector: "node.highlight",
        style: {
          "border-color": "#000",
          "border-width": "2px",
        },
      },
      {
        selector: "node.semitransp",
        style: { opacity: "0.5" },
      },
    ],
    //elements: data.datas
    elements: graphData.datas,
  });

  //移除沒有關聯的節點
  cy.nodes(function (element) {
    if (element.isNode() && element.degree() < 1) {
      cy.remove(element);
    }
  });

  //重新排版
  cy.layout({
    name: "fcose",
    //name: "dagre",
    //name: "circle",
  }).run();

  

  //掛載 click事件
  cy.bind("click", "node", function (evt) {
    console.log("CY Node Click");
    //console.log("node clicked: ", evt.target.id());
    tmp_selectedNode = evt.target;
    //cy.elements().removeClass("semitransp");
    //cy.elements().removeClass("highlight");

    UpdatePropertyFields(tmp_selectedNode.id());
    //sel.addClass("highlight").outgoers().addClass("highlight");
  });

  cy.bind("click", "edge", function (evt) {
    //console.log("node clicked: ", evt.target.id());
    tmp_selectedNode = evt.target;
    //console.log(tmp_selectedNode);
    //console.log(tmp_selectedNode.id());
    UpdatePropertyFields(tmp_selectedNode.id());
  });

  //右鍵點擊
  cy.bind("cxttap", "node", function (evt) {
    console.log("right click");
    rightClickedTarget = evt.target;
    tmp_selectedNode = evt.target;
    console.log(tmp_selectedNode);
    console.log(tmp_selectedNode.id());
  });

  console.log(cy.elements().json());
  console.log(cy.json());
  $("#loading").hide();
}

//清除圖
function ClearGraph() {
  cy = cytoscape({
    container: document.getElementById("cy"),
  });
  cy.elements().remove();
}

//更新屬性欄位
function UpdatePropertyFields(id) {
  //var query = '[id="' + id + '"]"';
  //var node = cy.filter(query);
  var node = GetNodeById(id);
  if (node.length > 0) {
    $(side__nav_node_id).val(id);
    $(side__nav_node_name).val(node.data("name")); //取得name屬性
    $(side__nav_node_color).val(node.data("faveColor")); //取得name屬性
  } else {
    $(side__nav_node_id).val("");
    $(side__nav_node_name).val(""); //取得name屬性
  }
  console.log(node);
  console.log(node.data("name"));
}

//用id屬性找node
function GetNodeById(id) {
  var query = '[id="' + id + '"]"';
  var node = cy.filter(query);
  return node;
}
//匯出
async function ExportGraph() {
  //const data = JSON.stringify(graphData);
  const data = cy.json().elements;
  //將資料壓平
  const data_toWrite = JSON.stringify({
    datas: [...data.nodes, ...data.edges],
  });
  const opts = {
    types: [
      {
        description: "json file",
        accept: { "text/plain": [".txt"] },
      },
    ],
    //excludeAcceptAllOption: true,
    multiple: false,
  };

  const newHandel = await window.showSaveFilePicker(opts);
  // create a FileSystemWritableFileStream to write to
  const writableStream = await newHandel.createWritable();

  // write our file
  await writableStream.write(data_toWrite);

  // close the file and write the contents to disk.
  await writableStream.close();
}

//匯出 PNG
async function ExportGraphPng() {
  const data = cy.png();
  const opts = {
    types: [
      {
        description: "Images",
        accept: {
          "image/*": [".png"],
        },
      },
    ],
    //excludeAcceptAllOption: true,
    multiple: false,
  };

  //base64 轉 blob
  const url = decodeURIComponent(data).split(",")[1];

  const imgBlob = Uint8Array.from(atob(url), (c) => c.charCodeAt(0));
  console.log(imgBlob);

  const newHandel = await window.showSaveFilePicker(opts);
  // create a FileSystemWritableFileStream to write to
  const writableStream = await newHandel.createWritable();

  // write our file
  await writableStream.write(imgBlob);

  // close the file and write the contents to disk.
  await writableStream.close();
}

// 匯入檔案
$("#json_input").on("change", function () {
  var file = this.files[0];

  //blob轉base64事件
  const fr = new FileReader();
  fr.onload = function (e) {
    var data = e.target.result;
    var data_json = JSON.parse(data);
    SetScape(data_json);
    console.log(data_json);
  };

  if (file) {
    fr.readAsText(file);
    console.log(file);
  } else {
    console.log("沒有檔案");
    alert("不支援檔案類型");
  }
});

//修改node property
function SetNodeProperty() {
  const id = $(side__nav_node_id).val();
  const newName = $(side__nav_node_name).val();
  const newColor = $(side__nav_node_color).val();
  if (id) {
    var node = GetNodeById(id);
    node.data("name", newName); //設定新的name
    node.data("faveColor", newColor);
  }
}

//刪除節點
function DeleteNode() {
  const id = $(side__nav_node_id).val();
  if (id) {
    var node = GetNodeById(id);
    cy.remove(node);
  }
}

// 按右鍵開啟操作?
var mousePos = { x: 0, y: 0 };
$("#cy").mousedown(function (event) {
  var xOffset = 350;
  mousePos = { x: event.pageX - xOffset, y: event.pageY };
  event.preventDefault();
  $("#cy-floating-window").hide();
  switch (event.which) {
    case 1:
      //alert('Left Mouse button pressed.');
      break;
    case 2:
      //alert('Middle Mouse button pressed.');
      break;
    case 3:
      //alert('Right Mouse button pressed.');
      $("#cy-floating-window").show();
      $("#cy-floating-window").offset({ left: event.pageX, top: event.pageY });

      //若有已被選擇的點，則出現"建立連結"選像
      tmp_selectedNode = cy.$(".highlight")[0];
      if (tmp_selectedNode) {
        $("#floating-window-create-edge").show();
      } else {
        $("#floating-window-create-edge").hide();
      }
      break;
    default:
      alert("You have a strange Mouse!");
  }
});

//創建新空白節點
function CreateBlankNode() {
  var newId = CryptoJS.SHA256(new Date().getTime().toString()).toString();

  cy.add([
    {
      data: {
        id: newId,
        name: "Blank Node",
        faveColor: "#aaa",
      },
      renderedPosition: mousePos,
    },
  ]);
}

//建立空白連結
function CreateBlankEdge() {
  var newId = CryptoJS.SHA256(new Date().getTime().toString()).toString();
  var targetID = rightClickedTarget.id();
  var soruceID = cy.$(".highlight")[0].id();
  cy.add([
    {
      data: {
        id: newId,
        name: "",
        source: soruceID,
        target: targetID,
        faveColor: "#aaa",
      },
    },
  ]);
}
