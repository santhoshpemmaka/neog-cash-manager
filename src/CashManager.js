import React, { useState } from 'react';
import './CashManager.css';

const CashManager = () =>{
    const [billAmount,setbillAmount] = useState();
    const [cashAmount,setcashAmount] = useState();
    const [errorText,seterrorText] = useState('');
    const notes = [2000,500,100,50,20,10,5,1];
    const [avaiableNotes,setavaiableNotes] = useState([]);
    let amountChange = []
    const btnSubmithandler = () => {

        if(billAmount > 0){
            console.log(billAmount,cashAmount);
            if(cashAmount > billAmount){
                let amountToreturn = cashAmount - billAmount;
                calculateChange(amountToreturn);
                seterrorText();
            }
            else{
                showMessage('Do you wanna wash plates?');
            }
        }
        else{
            showMessage('Invalid Bill Amount');
        }
    }

    const calculateChange = (amountToreturn) => {
        for(let i=0;i<notes.length;i++){
            const numberNotes = Math.trunc(amountToreturn/notes[i]);
            amountToreturn %= notes[i];
            amountChange.push(numberNotes);
        }
        console.log(avaiableNotes);
        setavaiableNotes(amountChange);
    }

    const showMessage = (msg) => {
        seterrorText(msg);
        setavaiableNotes();
    }
    const billamountHandler = (e) => {
        setbillAmount(Number(e.target.value))
    }
    const cashamountHandler = (e) => {
        setcashAmount(Number(e.target.value))
    }
    return(
        <div className="main">
            <h2>Cash Manager Application</h2>
            <p>Enter the bill amount and cash given by the customer and know minimum number of notes to return.</p>
            <div className='input-text'>
                <h3>Bill Amount:</h3>
                <input onChange ={(e) => billamountHandler(e)} type='number' value={billAmount}/>
            </div>
            <div className='input-text'>
                <h3>Cash Given:</h3>
                <input onChange ={(e) => cashamountHandler(e)} type='number' value={cashAmount}/>
            </div>
            <button onClick={btnSubmithandler}>Check</button>
            <h2>{errorText}</h2>
            <table>
                <caption>Return Change</caption>
                <tbody>
                    <tr>
                    <th>No. of Notes</th>
                    {avaiableNotes && avaiableNotes.length>1 && avaiableNotes.map((note)=>(
                        <td key={note}>{note}</td>
                    ))}
                    </tr>
                <tr>
                    <th>Notes</th>
                    <td>2000</td>
                    <td>500</td>
                    <td>100</td>
                    <td>50</td>
                    <td>20</td>
                    <td>10</td>
                    <td>5</td>
                    <td>1</td>
                </tr>
                </tbody>
      </table>
        </div>
    )
}

export default CashManager;