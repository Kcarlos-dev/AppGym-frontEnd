"use client"
import style from "./page.module.css"
import { useEffect, useState } from "react"
const getProfile = JSON.parse(localStorage.getItem("profile") || '""');
let treinoInferiores = getProfile.treino.inferiores
let treinoSuperiores = getProfile.treino.superiores



type Props = {
    treino: string
}

export default function Treinos({ treino }: Props) {
    return (
        <main className={style.box_scroll}>
            {treino === "superiores" ? (
                <div>
                    {treinoSuperiores.map((item:any, index:number) => (
                        <div key={index}>
                            <h4>{item.exercicio}</h4>
                            <p>Músculos trabalhados: {item.musculos.join(", ")}</p>
                        </div>
                    ))}
                </div>

            ) : (
                <div>
                {treinoInferiores.map((item:any, index:number) => (
                    <div key={index}>
                        <h4>{item.exercicio}</h4>
                        <p>Músculos trabalhados: {item.musculos.join(", ")}</p>
                    </div>
                ))}
            </div>
            )}

        </main>
    )
}