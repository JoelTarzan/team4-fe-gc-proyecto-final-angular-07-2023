# Team-4Fe-Gc-Proyecto-Final-Angular-07-2023

![image](https://github.com/JoelTarzan/team4-fe-gc-proyecto-final-angular-07-2023/assets/135845147/0a78c679-bd44-4d76-b09c-c677b4dbbc59)


# Aurum RH - Frontend

Aurum RH es una aplicación web que almacena y administra el proceso de selección de un candidato durante el reclutamiento empresarial. Aurum puede hacer uns seguimiento del proceso de selección, crear perfiles, calendarizar eventos, crear candidaturas, centralizar y facilitar la información para los reclutadores y evaluar a los candidatos y sus aptitudes. Aurum tiene un diseño sencillo, limpio, fácil y destinado al ámbito profesional.

## Roles

Los usuarios se dividen en tres roles: candidato, reclutador y administrador. Hay funcionalidades comunes y otras solo accesibles por cierto rol.

### Candidato

El usuario candidato es aquel que viene a postularse a una o más candidaturas. Puede crearse un perfil y establecer sus aptitudes, buscar, apuntarse a candidaturas y seguir su progreso.

![image](https://github.com/JoelTarzan/team4-fe-gc-proyecto-final-angular-07-2023/assets/135845147/caa67160-5c2f-4429-8fd5-fadc7b6efc7c)


### Reclutador

El reclutador (también llamado internamente RRHH - recursos humanos) puede crear candidaturas, gestionarlas, calendarizar eventos o procesos para los candidatos, evaluar aptitudes, evaluar candidatos, acceder a la información del candidato y a la de las candidaturas.

![image](https://github.com/JoelTarzan/team4-fe-gc-proyecto-final-angular-07-2023/assets/135845147/f85838ed-29fa-4174-9eda-2bb1dacdbb38)


### Administrador

El administrador comparte funcionalidades del reclutador pero principalmente su función es administrar usuarios, puede cambiar su rol.

![image](https://github.com/JoelTarzan/team4-fe-gc-proyecto-final-angular-07-2023/assets/135845147/ccc1fa58-79b8-40a5-817d-688fafec903e)


## Vistas - Aurum RH

Además de vistas comunes a todos los usuarios algunas varian según el rol y otras solo son accesibles por determinado rol.

### Inicio de sesión

![image](https://github.com/JoelTarzan/team4-fe-gc-proyecto-final-angular-07-2023/assets/45524750/330c80ab-b390-4993-8cd4-1d3244bb733a)

### Registro

![image](https://github.com/JoelTarzan/team4-fe-gc-proyecto-final-angular-07-2023/assets/45524750/b6ed82f4-ff04-4833-83ad-e3aeafc84a54)

### Inicio

La vista principal. Aquí encontramos las candidaturas (ofertas de trabajo) abiertas y un buscador para filtrarlas por nombre. Las candidaturas muestran un resumen de su descripción e indica cuantas aptitudes de las requeridas encajan con las de tu perfil.

![image](https://github.com/JoelTarzan/team4-fe-gc-proyecto-final-angular-07-2023/assets/45524750/f5cbc46e-14cb-4ac2-8c53-9019c387386d)

### Perfil

El perfil del usuario, con nombre, apellidos, título, links a redes y web personal, descripción y aptitudes.

![image](https://github.com/JoelTarzan/team4-fe-gc-proyecto-final-angular-07-2023/assets/135845147/b35dac5c-e61e-4bd8-bba2-13bf3aeeaac0)


### Cambio de contraseña
![image](https://github.com/JoelTarzan/team4-fe-gc-proyecto-final-angular-07-2023/assets/45524750/124d780d-2de7-421e-b99d-f45f3964e6b2)

### Sobre nosotros

Describe qué es Aurum y muestra a los creadores de Aurum RH y su LinkedIn.

![image](https://github.com/JoelTarzan/team4-fe-gc-proyecto-final-angular-07-2023/assets/45524750/06ef0bbb-b166-492e-939a-9ac76ef2b306)

### Candidaturas (candidato)

Lista de candidaturas donde el candidato se ha apuntado.

![image](https://github.com/JoelTarzan/team4-fe-gc-proyecto-final-angular-07-2023/assets/135845147/332d728f-d3ca-4115-9825-246c5cab205f)


### Procesos (candidato)

Eventos pendientes calendarizados de una candiatura concreta establecidos por un reclutador.

![image](https://github.com/JoelTarzan/team4-fe-gc-proyecto-final-angular-07-2023/assets/135845147/f6ddd80a-df51-4ad7-bac8-3553750e246d)


### Candidatura (candidato)

Todos los detalles de una candidatura. Incluye botón para apuntarse y una barra de progreso de la candidatura en el caso de que se haya aplicado y un reclutador haya creado eventos (procesos).

![image](https://github.com/JoelTarzan/team4-fe-gc-proyecto-final-angular-07-2023/assets/135845147/3f3e26a5-726c-452a-92be-ba587072c803)


### Procesos (reclutador)

Lista de procesos y eventos a los que el reclutador se ha suscrito para tener un seguimiento.

![image](https://github.com/JoelTarzan/team4-fe-gc-proyecto-final-angular-07-2023/assets/135845147/f3725e8b-99e5-46a0-96fd-909504348409)


### Candidatos (reclutador)

Lista total de candidatos activos en Aurum junto a su valoración general.

![image](https://github.com/JoelTarzan/team4-fe-gc-proyecto-final-angular-07-2023/assets/135845147/5f42a42c-1a23-4bae-a583-6d897931ff54)


### Candidato (reclutador)

Todos los detalles del candidato y sus candidaturas. Se pueden valorar sus aptitudes mediante un checkbox (solo visible para reclutadores).

![image](https://github.com/JoelTarzan/team4-fe-gc-proyecto-final-angular-07-2023/assets/135845147/e22d8362-8b2a-49b4-869e-8522aaea231d)


### Gestión de candidaturas (reclutador)

Lista de todas las candidaturas abiertas y cerradas (verde para abiertas, rojo para cerradas). Con el botón "+" podemos crear una nueva. Es posible filtrar las candidaturas por aptitudes.

![image](https://github.com/JoelTarzan/team4-fe-gc-proyecto-final-angular-07-2023/assets/135845147/d3d62e4a-27e5-4da7-96fd-4c0b5d4c4abe)


### Candidatura (reclutador)

Todos los detalles de la candidatura y herramientas para editarla. Tiene botones para abrir/cerrar y eliminar.

![image](https://github.com/JoelTarzan/team4-fe-gc-proyecto-final-angular-07-2023/assets/135845147/2f93c966-38c2-450e-9e82-58dc0d23bf82)


### Postulación del candidato (reclutador)

La postulación para una candidatura de un candidato en concreto. Se puede ver y validar aptitudes del candidato, crear eventos (porcesos) para su candidatura y subscribirse a esos eventos para tener un seguimiento. La barra de progreso se actualizará al momento cuando se marque en que proceso se encuentra el candidato respecto a esta candidatura. El candidato verá las actualizaciones excepto la validación de aptitudes.

![image](https://github.com/JoelTarzan/team4-fe-gc-proyecto-final-angular-07-2023/assets/135845147/df2661df-b975-4a4a-9c91-08407a797a93)


### Gestión de usuarios (administrador)

Lista con todos los usuarios. El administrador puede cambiarles el rol en cualquier momento.

![image](https://github.com/JoelTarzan/team4-fe-gc-proyecto-final-angular-07-2023/assets/135845147/a2a81ad9-eec6-430e-b8eb-98bddfdef760)

