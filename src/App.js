import React, { useEffect, useState } from 'react'
import './App.css'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";

const App = () => {
  const[mode , setMode] = useState('Light')
  const [btn, setBtn] = useState(false)
  const [text, setText] = useState()
  const {transcript,resetTranscript,browserSupportsSpeechRecognition} = useSpeechRecognition();
  const [isCopied, setCopied] = useClipboard(text , {
    successDuration: 1000,
  });
  const changemode = ()=>{
    if(mode==='Light'){
      setMode('Dark')
    }
    else{
      setMode('Light')
    }
  }
  useEffect(()=>{
    const element = document.getElementById('text')
    element.scrollTop = element.scrollHeight;
  })
  useEffect(()=>{
    if(mode){
      console.log(mode);
      let width = window.screen.width;
      console.log(width);
      if(mode==='Light'){
        document.body.style.backgroundColor='white'
        document.getElementById('h1').style.color='black'
        document.getElementById('text').style.borderColor='black'
        document.getElementById('text').style.color='black'
      }
      else{
        document.body.style.backgroundColor='black'
        document.getElementById('h1').style.color='white'
        document.getElementById('text').style.borderColor='white'
        document.getElementById('text').style.color='white'
      
      }
    }
  },[mode])
  useEffect(() => {
    if (transcript === '') {
      setBtn(false)
    }
    else {
      setBtn(true)
      setText(transcript)
    }
  }, [transcript])
  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setBtn(false)
        // document.getElementById('text').innerHTML=''
        resetTranscript()
        SpeechRecognition.stopListening()
      }, 1000)
    }
  }, [isCopied ,resetTranscript])
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
 
  return (
    <div className='maincon'>
      <div>
        <h1 id='h1'>Speech To Text !!</h1>
      </div>
      <div className='textbox' id='text'>
        {transcript}
      </div>
      <div className="buttons">
        {btn && <button onClick={setCopied} style={mode==='Light'? {backgroundColor:'black' ,color:'white'} : {backgroundColor:'white' , color:'black'}} id='copy'>
          {isCopied ? "Copied" : "Copy"}
        </button>}
        <button onClick={() => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' })} style={mode==='Light'? {backgroundColor:'black' ,color:'white'} : {backgroundColor:'white' , color:'black'}}>Start Listening</button>
        {/* <button onClick={() => SpeechRecognition.stopListening()}>Stop Listening</button> */}
        <button onClick={changemode} style={mode==='Light'? {backgroundColor:'black' ,color:'white'} : {backgroundColor:'white' , color:'black'}} id='mode'>{mode==='Light'? 'Dark' : 'Light'}</button>
      </div>
    </div>
  )
}

export default App
