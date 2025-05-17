"use client"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import 'bootstrap/dist/js/bootstrap.bundle.min'
import {Toast} from "bootstrap"
import styles from "../page.module.css"
import { useState } from "react"
import axios from "axios"

export default function SetPassword() {
    const getProfile = JSON.parse(sessionStorage.getItem("profile") || "")
    const [passwordSee, setPasswordSee] = useState({ type: 'password', see: true })
    const [textAlert, settextAlert] = useState("Senhas iguais!!")
    const [bgAlert,setBgAlert] = useState("bg-info")
    const url = "http://192.168.100.220:3000"
    
    function visualizarSenha() {
        if (passwordSee.see) {
            setPasswordSee({ type: 'text', see: false })
            return
        }
        setPasswordSee({ type: 'password', see: true })
        return

    }
    function AlertInput(text?: any,style?:any) {
        var toastElList = [].slice.call(document.querySelectorAll('.toast'))
        var toastList = toastElList.map(function (toastEl) {
            return new Toast(toastEl)
        })
        toastList.forEach(toast => toast.show())
        setBgAlert(style)
        settextAlert(text)

    }

    function UpdatePassword() {
        const oldPassword:any = document.getElementById("oldPassword")
        const newPassword:any = document.getElementById("newPassword")

        if(oldPassword.value === newPassword.value){
            AlertInput("Senhas iguais!!","bg-danger")
            return
        }
     
        const obj = {
            alter:"password",
            nome:"teste",
            senha:oldPassword.value,
            nv_senha:newPassword.value
        }
        
        axios
        .put(`${url}/user/alter/${getProfile.id}`,obj)
        .then((res)=>{
            AlertInput(res.data.message,"bg-success")
        })
        .catch((err)=>{
            AlertInput(err.response.data.message,"bg-danger")
            
        })
    }

    return (
        <section>
            <div className={`toast  align-items-center ${styles.box_alert}`} role="alert" aria-live="assertive" aria-atomic="true">
                <div className={`d-flex ${bgAlert} text-light`}>
                    <div className="toast-body">
                        {textAlert}
                    </div>
                    <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
            <div className="d-flex flex-column align-items-center ">
                <h4>Alterar Senha de Usuario</h4>
                <div>
                    <label>senha atual:</label>
                    <br />
                    <input
                        id="oldPassword"
                        className={styles.style_input + " border border-1 border-dark"}
                        type={passwordSee.type} />
                </div>
                <div>
                    <label>nova senha:</label>
                    <br />
                    <input
                        id="newPassword"
                        className={styles.style_input + " border border-1 border-dark"}
                        type={passwordSee.type} />
                    <div className="d-flex">
                        <input onClick={visualizarSenha} type="checkbox" />
                        <label className="mx-1">Exibir senha</label>
                    </div>
                    <div className={styles.style_flex_end}>
                        <button onClick={UpdatePassword} className={styles.style_btn_default + ' text-black my-2'}>Alterar</button>
                    </div>
                </div>
            </div>
        </section>
    )
}