import { Button, Empty, EmptyDescription, EmptyImage, EmptyTitle } from 'keep-react'
import React, { useState, useEffect } from 'react';


function App() {
  
    const calculateTimeLeft = () => {
        const difference = +new Date('2024-08-07') - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((difference % (1000 * 60)) / 1000)
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    const timerComponents = [];

    Object.keys(timeLeft).forEach(interval => {
        if (!timeLeft[interval]) {
            return;
        }

        timerComponents.push(
            <span key={interval}>
                {timeLeft[interval]} {interval}{" "}
            </span>
        );
    });
  
  return (
    <Empty>
      <EmptyImage>
        <img
          src="https://staticmania.cdn.prismic.io/staticmania/499b23f3-41ed-4bc9-a9eb-43d13779d2f8_Property+1%3DSad+screen_+Property+2%3DSm.svg"
          height={234}
          width={350}
          alt="404"
        />
      </EmptyImage>
      <EmptyTitle className="mb-[14px] mt-5 text-slate-900">Inventario Fuera de Servicio</EmptyTitle>
      <EmptyDescription className="mb-8">
        Estamos trabajando en mejorando las funcionalidades de la aplicación. Por favor, se paciente.
      </EmptyDescription>
      <p className='text-slate-200 text-3xl'>
        {timerComponents.length ? timerComponents : <span>¡La actualización ya está disponible!</span>}
      </p>
    </Empty>
  );
}

export default App;
