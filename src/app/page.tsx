"use client"

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"
import styles from './page.module.css'
import { useState } from "react";

export default function Login() {
    const [mostrarLogin, setMostrarLogin] = useState(true)
    const [passwordSee, setPasswordSee] = useState({type:'password',see:true})
    
    function alternarLogin(text: string) {
        setPasswordSee({type:'password',see:true})
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

    return (
        <main className={styles.box_main}>
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
                        <div>
                            <button className="btn btn-link text-black p-0 py-1">esqueceu a senha?</button>
                        </div>
                        <div className={styles.style_flex_end}>
                            <button  className={styles.style_btn_default + ' text-black'}>login</button>
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