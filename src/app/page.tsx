"use client"

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"
import styles from './page.module.css'
import { useEffect, useState } from "react";
import { Toast } from "bootstrap";

export default function Login() {
    
    const [mostrarLogin, setMostrarLogin]   = useState(true)
    const [passwordSee, setPasswordSee]     = useState({type:'password',see:true})
    const [EmailInput,setEmailInput]        = useState("")
    const [PasswordInput,setPasswordInput]  = useState("")
    const [NomeInput,setNomeInput]          = useState("")
    const [DataNascInput,setDataNascInput]  = useState("")
    const [CpfInput,setCpfInput]            = useState("")

    function limparInput(){
        setPasswordSee({type:'password',see:true})
        setEmailInput("")
        setPasswordInput("")
    }

    function AlertInput(input:string){
        if(input.trim().length <= 0){
            var toastElList = [].slice.call(document.querySelectorAll('.toast'))
            var toastList = toastElList.map(function(toastEl) {
              return new Toast(toastEl)
            })
            toastList.forEach(toast => toast.show()) 
        }
    }
    
    function alternarLogin(text: string) {
        limparInput()
        
        if (text === "c") {
            setMostrarLogin(false)
            return
        }
        setMostrarLogin(true)
    }
    function visualizarSenha(){
        if(passwordSee.see){
            setPasswordSee({type:'text',see:false})
            return 
        }
        setPasswordSee({type:'password',see:true})
        return 

    }

    function btnLogin(){
        AlertInput("")
    }

    return (
        <main className={styles.box_main}>
            
            <div className={`toast ${styles.box_alert}`}>
                <div className="toast-header">
                <strong className="me-auto">Toast Header</strong>
                <button type="button" className="btn-close" data-bs-dismiss="toast"></button>
                </div>
                <div className="toast-body">
                <p>Some text inside the toast body</p>
                </div>
            </div>

            <div className={styles.box_secund}>
                <div className={styles.style_box_medium}>
                    <button onClick={() => alternarLogin("c")} className={`${mostrarLogin ? styles.style_btn_none_01 : styles.style_btn_none_02} text-black`}>CADASTRAR</button>
                    <button onClick={() => alternarLogin('l')} className={`${mostrarLogin ? styles.style_btn_none_02 : styles.style_btn_none_01} text-black`}>LOGIN</button>
                </div>
                <div className={styles.style_box_perfi}>
                    <i className="bi bi-person-circle"></i>
                </div>

                {mostrarLogin ? (
                    <div>
                        <div>
                            <label>Email:</label>
                            <br />
                            <input 
                                value={EmailInput} 
                                className={styles.style_input} 
                                onChange={(e)=>setEmailInput(e.target.value)}
                                type="text" />
                        </div>
                        <div>
                            <label>senha:</label>
                            <br />
                            <input 
                                value={PasswordInput}
                                className={styles.style_input} 
                                onChange={(e)=>setPasswordInput(e.target.value)}
                                type={passwordSee.type} />
                            <div className="d-flex">
                                <input onClick={visualizarSenha} type="checkbox" />
                                <label className="mx-1">Exibir senha</label>
                            </div>
                        </div>
                        <div>
                            <button className="btn btn-link text-black p-0 py-1">esqueceu a senha?</button>
                        </div>
                        <div className={styles.style_flex_end}>
                            <button onClick={btnLogin}  className={styles.style_btn_default + ' text-black'}>login</button>
                        </div>
                    </div>
                ) : (
                    <div >
                        <div className={styles.box_scroll}>
                            <div>
                                <label>Nome:</label>
                                <br />
                                <input className={styles.style_input} type="text" />
                            </div>
                            <div>
                                <label>CPF:</label>
                                <br />
                                <input className={styles.style_input} type="text" />
                            </div>
                            <div>
                                <label>Data de Nascimento:</label>
                                <br />
                                <input className={styles.style_input} type="date" />
                            </div>
                            <div>
                                <label>Email:</label>
                                <br />
                                <input className={styles.style_input} type="text" />
                            </div>
                            <div>
                                <label>senha:</label>
                                <br />
                                <input className={styles.style_input} type={passwordSee.type} />
                                <div className="d-flex">
                                    <input onClick={visualizarSenha} type="checkbox" />
                                    <label className="mx-1">Exibir senha</label>
                                </div>
                            </div>
                        </div>
                        <div className={styles.style_flex_end}>
                            <button className={styles.style_btn_default + ' text-black'}>cadastras</button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    )
}