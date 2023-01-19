# HAMSTERWARS-inlamning
https://hamsterwars-c1yj.onrender.com/

It may be slow to load the data, as it is a shared free service on render. try refreshing :)

## Om Appen

 Ett roligt spel där man får ett random lista av 2 hamstrar. Som spelar ska du välja vem av två hamstrar som spelar som är sötast. Hamstrarna samlas på vinster och förluster. 
Spelaran kommer även få tillgång till gallery(allahamstrar)

## Frontend sida 

###### Pages

**Startsida**

Välkommen sida som visar var det är. Spelaren får välja om den vill till galleriet eller börja spela

**Battle**

Detta är spel sidan där har jag fetchat så att man får 2 random hamster bilder som ska tävla mot varandra 
när man klickar på den man tycker är sötast har jag gjort en popup modal med resultatet i. Resultaten har jag lagt i en componant. I den står finns det med mer info hur många pöeng båda vinnaren och förlorarens pöeng. 
och att man kan starta en ny match. 

Har även gjort så att om man inte tycker att nån av hamstrarna är söta så kan man välja ett ny spel. 

**gallery**

Fetchar alla Hamstrar och använder flexbox för att få en grid utsiden på bilderna. 
I galleri har jag lagt till en fuction där man kan klicka på bilden för att få mier info om respektive hamster.
Har också fetchat så att man kan lägga till en ny hamster till spelet eller ta bort en hamster.
ADD hamster formen har jag lagt i en popup modal.

Jag har även två iconer för static och history 
|
|

**Static**

I den här sidan har jag fetchat att top fem. 
top fem vinnarna och top fem förlorarna. 

**History**

Här har jag fetchat båda matches och hamsters. Sedan jämfört hamstranas (har varit med i spelet) id med hamstrarnas id (i hamsterlistan).
Om de har samma id så ska jag kunna ha tillgång till deras info så som bilder och namn för att sedan mappa och skriva ut på webbsidan.



## Backend

I backend började jag med att göra servern och en configfil för mina "hemligheter". 
har gjort så att min env.fil är gömnd 


**Servern**

Där använder jag express och cors och kör en app listen och middlewares.
jag tar även emot min (connectar)databas och mina routes och varibles från min configfil så som min PORT. 

**Databas*

I min databas fil här kopplar jag min mongodb och säger vilket databas jag vill ha för att sen kunna ha till gång till mina collections i mina routes. Exporteras till min routes.js

**Routes**

Min routes folder har två routes hamsters.js och matches.js.
I de använder jag mig av express och express.router()
sedan tar jag även in min databas från min database.js

-en för hamsters

**endpoints**

GET + GET:ID+ GET/RANDOM
PUT
DELETE
POST

-en för matches

GET + 
DELETE
POST



###### Vill ha feedback om vad jag kan förbättra eller tänka på till framtiden. 

