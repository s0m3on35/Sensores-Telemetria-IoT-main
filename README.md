# Sensores, Telemetria Generica y Recoleccion Territorial IoT

Repositorio educativo con una visualizacion interactiva del Curso 3 sobre sensorizacion territorial, telemetria generica, tecnologias LPWAN y preparacion del dato IoT para capas posteriores.

El objetivo es transformar el material de clase y las practicas en una referencia clara, navegable y util para estudiar, justificar arquitecturas y preparar entregables.

---

## Contenido

El proyecto cubre los siguientes bloques:

- Taxonomia de sensores territoriales: ambientales, trafico, agua, edificios y energia.
- Tecnologias de conectividad: LoRaWAN, NB-IoT, LTE-M, WiFi, Ethernet, RS-485 y arquitecturas hibridas.
- Clases LoRaWAN A/B/C segun consumo, latencia y ventanas de recepcion.
- NB-IoT/LTE-M en espectro licenciado, SIM/eSIM, PSM y eDRX.
- Comparativa territorial de WiFi, Zigbee, Z-Wave y topologias malla/estrella.
- Matriz comparativa de conectividad: cobertura, ancho de banda, autonomia y soberania.
- Ciclo de vida del hardware: seleccion, instalacion, calibracion, mantenimiento y sustitucion.
- Presupuesto energetico, modos sleep, radio TX y MTBF de nodos a bateria.
- Arquitecturas de gateways, servidores de red, payload formatters e integraciones.
- Orquestacion de flotas: LwM2M frente a MQTT, OTA y coste de sesiones.
- Seguridad en capa fisica, operacion de campo y eficiencia energetica.
- Practica TTN: del payload hexadecimal/binario al JSON tecnico.
- Serializacion binaria frente a JSON en dispositivos LPWAN.
- Casos de decision: territorio rural, puntos remotos y edificios municipales.
- Especificacion ejemplo: nivel de rio en cuenca critica con radar, 4-20 mA, solar y LoRaWAN privado.
- Especificaciones ejemplo: smart parking urbano y vinedo Rias Baixas.

---

## Objetivo

Este repositorio no es solo una presentacion. Esta pensado como herramienta de trabajo para:

- Entender que el sensor no envia necesariamente JSON, sino bytes que deben decodificarse.
- Elegir conectividad segun distancia, cobertura, energia disponible, mantenimiento y criticidad.
- Separar la capa de medida, la capa de comunicacion y la capa de recoleccion.
- Justificar por que algunas tecnologias se descartan en cada caso.
- Preparar salidas tecnicas como payload decodificado, JSON normalizado o eventos listos para plataforma.

---

## Estructura del proyecto

```text
/
├── README.md
└── docs/
    ├── index.html
    ├── style.css
    ├── main.js
    ├── README.md
    └── assets/
        ├── caso-1.png
        ├── caso-2.png
        └── caso-3.png
```

---

## Como usarlo

No requiere instalacion ni dependencias.

1. Clonar o descargar el repositorio.
2. Abrir `docs/index.html` en el navegador.

Opcionalmente, puede desplegarse con GitHub Pages apuntando a la carpeta `docs`.

---

## Practicas incluidas

### Diseno de infraestructura IoT

Tres escenarios de decision:

- Territorio rural con sensorica distribuida.
- Puntos remotos en orografia compleja.
- Edificios municipales en interior.

Cada caso pide justificar variables, sensores, comunicacion, infraestructura, alimentacion, riesgos, tecnologias descartadas y formato de salida.

### TTN: de la radiofrecuencia al JSON

Practica guiada con The Things Network / The Things Stack:

- Creacion de aplicacion.
- Registro de dispositivo LoRaWAN simulado.
- Decoder JavaScript para Dragino LHT65/LHT65N.
- Payload hexadecimal y Base64.
- Validacion en Live data.
- Comparacion conceptual TTN frente a ChirpStack.

---

## Enfoque

La idea central del proyecto es:

> El valor de una infraestructura IoT territorial no esta solo en medir. Esta en medir, transmitir, decodificar, validar y preparar el dato para que pueda explotarse con fiabilidad.

---

## Publico objetivo

- estudiantes de ingenieria territorial IoT
- tecnicos municipales
- perfiles de smart cities
- equipos de sensorizacion ambiental
- responsables de mantenimiento de redes IoT
- perfiles de datos que reciben telemetria desde campo

---

## Licencia

Uso libre para fines educativos y de investigacion.
