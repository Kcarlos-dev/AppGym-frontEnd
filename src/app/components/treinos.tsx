"use client"

import style from "./page.module.css"
import { useEffect, useState } from "react"

type Props = {
    treino: string
}

export default function Treinos({ treino }: Props) {
    const [treinoInferiores, setTreinoInferiores] = useState<any[]>([]);
    const [treinoSuperiores, setTreinoSuperiores] = useState<any[]>([]);

    useEffect(() => {
        const storedProfile = sessionStorage.getItem("profile");
        if (storedProfile) {
            try {
                const profile = JSON.parse(storedProfile);
                setTreinoInferiores(profile?.treino?.inferiores || []);
                setTreinoSuperiores(profile?.treino?.superiores || []);
            } catch (err) {
                console.error("Erro ao ler perfil do sessionStorage:", err);
            }
        }
    }, []);

    const treinoSelecionado = treino === "superiores" ? treinoSuperiores : treinoInferiores;

    if (!treinoSelecionado || treinoSelecionado.length === 0) {
        return <h1>Sem treinos</h1>;
    }

    return (
        <main className={style.box_scroll}>
            {treinoSelecionado.map((item: any, index: number) => (
                <div key={index}>
                    <h4>{item.exercicio}</h4>
                    <p>Músculos trabalhados: {item.musculos.join(", ")}</p>
                </div>
            ))}
        </main>
    );
}
