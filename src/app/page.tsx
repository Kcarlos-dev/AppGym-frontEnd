"use client"

import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import styles from './page.module.css'
import { useEffect, useReducer, useState } from "react"
import { Toast } from "bootstrap"
import { useRouter } from "next/navigation"

const url = "http://192.168.100.220:3000"

export default function Login() {
    const reducer = (state: any, action: any) => {
        switch (action.type) {
            case "SET_NAME":
                return { ...state, name: action.payload }
            case "SET_EMAIL":
                return { ...state, email: action.payload }
            case "SET_CPF":
                return { ...state, cpf: action.payload }
            case "SET_DATA_NASC":
                return { ...state, data_nasc: action.payload }
            case "SET_SENHA":
                return { ...state, senha: action.payload }
            default:
                return state
        }
    }

    const initialState = { name: "", email: "", cpf: "", data_nasc: "", senha: "", treino: "" }
    const [state, dispatch] = useReducer(reducer, initialState)
    const router = useRouter()
    const [getTextMsg, setTextMsg] = useState("Campos faltando!!")
    const [getBgStyle, setBgStyle] = useState("")
    const [mostrarLogin, setMostrarLogin] = useState(true)
    const [passwordSee, setPasswordSee] = useState({ type: 'password', see: true })
    const [EmailInput, setEmailInput] = useState("")
    const [PasswordInput, setPasswordInput] = useState("")

    //
    useEffect(() => {
        const profile = localStorage.getItem("profile")

        if (profile == null || profile == "") {
            return
        }
        router.push('/profile')

    }, [])



    function limparInput() {
        setPasswordSee({ type: 'password', see: true })
        setEmailInput("")
        setPasswordInput("")
    }

    function AlertInput(text: string,typeColor:string) {
        var toastElList = [].slice.call(document.querySelectorAll('.toast'))
        var toastList = toastElList.map(function (toastEl) {
            return new Toast(toastEl)
        })
        setBgStyle(typeColor)
        setTextMsg(text)
        toastList.forEach(toast => toast.show())

    }

    function alternarLogin(text: string) {
        limparInput()

        if (text === "c") {
            setMostrarLogin(false)
            return
        }
        setMostrarLogin(true)
    }
    function visualizarSenha() {
        if (passwordSee.see) {
            setPasswordSee({ type: 'text', see: false })
            return
        }
        setPasswordSee({ type: 'password', see: true })
        return

    }

    function btnCadastrar() {
        for (let i in state) {
            state["treino"] = "teste"

            if (state[i].trim().length <= 0) {

                if (i === "data_nasc") {
                    AlertInput(`Campo data de nascimento faltando`,"bg-danger")
                    return
                }
                if (i === "name") {
                    AlertInput(`Campo nome faltando`,"bg-danger")
                    return
                }
                AlertInput(`Campo ${i} faltando`,"bg-danger")
                return

            }
        }

        axios
            .post(`${url}/user/create`, state)
            .then((res) => {
                AlertInput(res.data.message,"bg-success")
            })
            .catch((err) => {
                let msg = err.response.data.message
                if(msg.includes("USERS.EMAIL")){
                    AlertInput("Esse email já foi cadastrado, escolha outro.","bg-warning text-dark")
                    return
                }
                AlertInput(msg,"bg-danger")
            })
    }

    function btnLogin(input01: string, input02: string) {
        const data = {
            email: input01,
            senha: input02
        }
        if (input01.trim().length <= 0 && input02.trim().length <= 0) {
            AlertInput(`Campo email ou senha faltando`,"bg-danger")
            return
        }
        axios
            .post(`${url}/login/auth`, data)
            .then((response) => { 
                if(response.data.length <= 0){
                    AlertInput("Usuario não encontrado","bg-warning text-dark")
                }
                let token = response.data.token

                if (token == null || token == "") {
                    return
                }
                axios
                    .get(`${url}/login/user`, {
                        headers: {
                            Authorization: token
                        }
                    })
                    .then(async (res) => {
                        localStorage.setItem("profile", JSON.stringify(res.data.user))
                        await router.push('/profile')
                    })
                    .catch((error) => {
                        console.log(`Token inexistente: ${error}`)
                    })

            })
            .catch((err) => {
                AlertInput("Usuario não existe","bg-warning text-dark")
            })
    }

    return (
        <main className={styles.box_main}>
            <div className={`toast align-items-center ${styles.box_alert}`} role="alert" aria-live="assertive" aria-atomic="true">
                <div className={`d-flex ${getBgStyle} text-light`}>
                    <div className="toast-body">
                        {getTextMsg}
                    </div>
                    <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
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
                                onChange={(e) => setEmailInput(e.target.value)}
                                type="text" />
                        </div>
                        <div>
                            <label>senha:</label>
                            <br />
                            <input
                                value={PasswordInput}
                                className={styles.style_input}
                                onChange={(e) => setPasswordInput(e.target.value)}
                                type={passwordSee.type} />
                            <div className="d-flex">
                                <input onClick={visualizarSenha} type="checkbox" />
                                <label className="mx-1">Exibir senha</label>
                            </div>
                        </div>
                      {/*
                       <div>
                            <button className="btn btn-link text-black p-0 py-1">esqueceu a senha?</button>
                        </div>
                       */}  
                        <div className={styles.style_flex_end}>
                            <button onClick={() => btnLogin(EmailInput, PasswordInput)} className={styles.style_btn_default + ' text-black'}>login</button>
                        </div>
                    </div>
                ) : (
                    <div >
                        <div className={styles.box_scroll}>
                            <div>
                                <label>Nome:</label>
                                <br />
                                <input
                                    value={state.name}
                                    className={styles.style_input}
                                    type="text"
                                    onChange={(e) => dispatch({ type: "SET_NAME", payload: e.target.value })}
                                />
                            </div>
                            <div>
                                <label>CPF:</label>
                                <br />
                                <input
                                    type="text"
                                    placeholder="CPF"
                                    value={state.cpf}
                                    onChange={(e) => dispatch({ type: "SET_CPF", payload: e.target.value })}
                                />
                            </div>
                            <div>
                                <label>Data de Nascimento:</label>
                                <br />
                                <input
                                    type="date"
                                    value={state.data_nasc}
                                    className={styles.style_input}
                                    onChange={(e) => dispatch({ type: "SET_DATA_NASC", payload: e.target.value })}
                                />
                            </div>
                            <div>
                                <label>Email:</label>
                                <br />
                                <input
                                    value={state.email}
                                    className={styles.style_input}
                                    type="text"
                                    onChange={(e) => dispatch({ type: "SET_EMAIL", payload: e.target.value })}
                                />
                            </div>
                            <div>
                                <label>senha:</label>
                                <br />
                                <input
                                    type={passwordSee.type}
                                    placeholder="Senha"
                                    value={state.senha}
                                    onChange={(e) => dispatch({ type: "SET_SENHA", payload: e.target.value })}
                                    className={styles.style_input}
                                />
                                <div className="d-flex">
                                    <input onClick={visualizarSenha} type="checkbox" />

                                    <label className="mx-1">Exibir senha</label>
                                </div>
                            </div>
                        </div>
                        <div className={styles.style_flex_end}>
                            <button onClick={btnCadastrar} className={styles.style_btn_default + ' text-black'}>cadastrar</button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    )
}