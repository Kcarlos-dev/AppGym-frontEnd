"use client"
import TelaComponet from "../components/setPassword"
import TelaTreinos from "../components/treinos"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import style from "./page.module.css"
import { useEffect, useLayoutEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Profile() {
    const [getTela, setTela] = useState(false)
    const [getTreinos, setTreinos] = useState({ tela: false, treino: "" })
    const getProfile = JSON.parse(localStorage.getItem("profile") || '""');
    const router = useRouter()


    useLayoutEffect(() => {

        if (!getProfile) {
            router.push("/")
        }
    }, [])
    function logout() {
        localStorage.clear()
        router.push("/")
    }
    function treinos() {
        setTreinos({ tela: false, treino: "" })
        setTela(false)
    }
    function alterPassword() {
        if (getTela) {
            setTela(false)
            return
        }
        setTela(true)
    }

    function btnTreinos(treino:string) {
        if (treino ==="inferiores") {
            setTreinos({ tela: true, treino: "inferiores" })
            return
        }
        setTreinos({ tela: true, treino: "superiores" })
    }

    return (
        <main className={style.bg_Princiapal}>
            {!getProfile ? (
                <h1>ERRO 404</h1>

            ) : (
                <div>
                    <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="#">Perfil</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <a onClick={treinos} className="nav-link">Treinos</a>
                                    </li>
                                    <li className="nav-item">
                                        <a onClick={() => alterPassword()} className="nav-link">Alterar Senha</a>
                                    </li>
                                    <li className="nav-item">
                                        <a onClick={logout} className="nav-link">Sair</a>
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </nav>

                    <section>
                        <div className="d-flex flex-column align-items-center ">
                            <div>
                                <i style={{ fontSize: "5rem" }} className="bi bi-person-circle"></i>
                            </div>
                        </div>
                        <div className="d-flex flex-column align-items-center">
                            <h5>{`${getProfile.name} #${getProfile.id}`}</h5>
                            <p>{getProfile.email}</p>
                        </div>
                    </section>

                </div>
            )}

            {getTela ? (
                <div>
                    <TelaComponet />

                </div>
            ) : (
                <section className="d-flex align-items-center justify-content-center flex-column my-2 ">
                    <h3>Treino</h3>
                    <div  className={`container m-2 ${style.box_medium}`}>
                        <div>
                            <button onClick={treinos} className={` ${style.btn_redondo} `}><i className="bi bi-arrow-left p-0 m-0 d-flex"></i></button>
                            <h4 className={` text-center`} >{getTreinos.treino}</h4>
                        </div>

                        {getTreinos.tela ? (
                            <TelaTreinos treino={getTreinos.treino} />
                        ) : (
                            <div className="row col justify-content-between">
                                <div className={`col ${style.div_default} ${style.bg_secundaria}`}>
                                    <button onClick={()=>btnTreinos("superiores")}>
                                        <img className="img-fluid" src="/img/superiores.webp" />
                                    </button>
                                    <p>superiores</p>
                                </div>
                                <div className={`col ${style.div_default} ${style.bg_secundaria}`}>
                                    <button onClick={()=>btnTreinos("inferiores")}>
                                        <img className="img-fluid m-0 p-0" src="/img/inferiores.webp" />
                                    </button>
                                    <p>inferiores</p>
                                </div>
                            </div>
                        )}

                    </div>
                </section>
            )}

        </main>
    )
}