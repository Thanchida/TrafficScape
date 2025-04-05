"use server";

export async function getPm25VsSpeed() {
  const res = await fetch("http://localhost:8000/api/overview/pm25_speed/");
  return res.json();
}

export async function getHumidityVsSpeed() {
  const res = await fetch("http://localhost:8000/api/overview/humidity_speed/");
  return res.json();
}

export async function getLightVsSpeed() {
    const res = await fetch("http://localhost:8000/api/overview/light_speed/");
    return res.json();
  }
  
  export async function getCorrelationMatrix() {
    const res = await fetch("http://localhost:8000/api/overview/correlation/");
    return res.json();
  }
  
