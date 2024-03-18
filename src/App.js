import React, { useState, useEffect} from "react";
import "./style.css";
import axios from "axios";

export default function App() {
  const [values, setFormInputs] = useState({
    team: "",
    name: "",
    number: "",
    address: "",
    etc: "",
  });

  //page onload 시 구동 (항상)
   useEffect(() => {
    //message 전송
    sendMsgToParentObj(values);
  });

  //page onload 시 구동 (한번만)
  useEffect(() => {
    window.addEventListener('message', receiveMsgFromParent);
  },[]);

   


 //input 값 변화
  function handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    setFormInputs((prev) => {
      return {
        ...prev,
        //[name]: type === "checkbox" ? checked : value,
        //name이 number-> 즉 number 작성 input 값은 글자 입력자체 불가 -> 숫자가 아닌 값을 입력하면 빈값으로 지워버려서 작성하지 못하게 막아둠
        [name] : name === "number" ? value.replace(/[^0-9]/g, '') : value,
      };
    });
    
    //react 상에서 입력값이 변경 시  ✓ 입력된 사용자 정보를 확인하였습니다. 해당 글자 지워짐
    receiveMsgFromParent(event);
  }


//넥사로부터 받은 메시지
function receiveMsgFromParent(event) {
 
  //if (e.origin !== "http://example.org:8080") return;
    
  var txt = document.getElementById("nexa");
  var oD = event.data;
 // console.log(oD.type);
  if (oD === null || oD === "" || oD===undefined || oD.type==="webpackOk"){
    return txt.value = "";
  }else{
   // txt.value = txt.value + oD + "\n";
   txt.value = oD  + "\n";
  }
   
  // if (typeof oD === "string") {
  //   txt.value = txt.value + oD + "\n";  
  // } else {
  //   for (var a in oD)
  //     txt.value = txt.value + a + ":::" + oD[a] + "\n";  
  // }
  //txt.value = e.data;
 
}

 	// 부모에게 메시지 전달
  function sendMsgToParentObj(values){

  axios({
       method:'post',
       post:'http://localhost:8080/',
       data: values,
       withCredentials: true,
       validateStatus: false 
   })  
   .then(function (response) {
    console.log(response);
   })
   .catch(function (error) {
    console.log(error);  
   });

   if(!window.parent) return;
 
  
    // 👇️ Store a JSON value in local storage
    localStorage.setItem('person', JSON.stringify(values));

    // 👇️ parse the value when accessing it
    const result = JSON.parse(localStorage.getItem('person'));

    //window.parent.postMessage( JSON.parse(result), '*' );
    //console.log("JSON >>>> " + JSON.stringify(result));
    window.parent.postMessage(result, '*' );
    
  }



  return (
    <div className="form-container">
      <h2>ADD USER</h2>
      <h5>Please fill in the text box</h5>
      <form className="form">
      <label>Team</label>
        <input
          type="text"
          placeholder="팀명을 입력해주세요"
          className="form--input"
          name="team"
          value={values.team}
          onChange={handleChange}
          required pattern= ".*\S+.*"
        />
        <label>Name</label>
        <input
          type="text"
          placeholder="이름을 입력해주세요"
          className="form--input"
          name="name" 
          value={values.name}
          onChange={handleChange}
          required pattern=".*\S+.*"
        />
        <label>Number</label>
        <input
          type="text"
          placeholder="번호를 입력해주세요"
          className="form--input"
          name="number"
          value={values.number}
          onChange={handleChange}
          required pattern = "^-?[0-9]\d*\.?\d*$"
        />
        <label>address</label>
          <input
          type="text"
          placeholder="주소를 입력해주세요"
          className="form--input"
          name="address"
          value={values.address}
          onChange={handleChange}
          required pattern=".*\S+.*"
        />
        <label>Etc</label>
          <input
          type="text"
          placeholder="기타내용을 입력해주세요"
          className="form--input"
          name="etc"
          value={values.text}
          onChange={handleChange}
        />
       <input
          type="text"
          className="label--output"
          name="nexa"
          id="nexa"
          value={values.nexa}
          onChange={handleChange}
          readOnly
        />
      </form>
    </div>
  );
}
