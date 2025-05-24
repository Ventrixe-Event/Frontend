Inlämningsuppgift - Molntjänster och distribuerade system

Introduktion till inlämningsuppgiften
I denna inlämningsuppgift ska du bygga upp grunderna för ett event-system. Det vill säga du ska bygga en så kallad MVP (Minimum Viable Product). En MVP är en version av en produkt med precis tillräckligt många funktioner för att vara användbar för tidiga användare, som därefter kan ge feedback för framtida produktutveckling. Systemet som du bygger ska vara av en systemarkitetur som heter microservices. Det vill säga flera olika små delsystem som hanterar funktionaliteten, med en frontendlösning som presenterar det grafiska.

Du ska utgå från designfilen som finns tillgänglig i denna inlämningsuppgift. Designfilen är inte komplett på något sätt och inte modifierad på något sätt, den innehåller information som kanske är underlig eller inte relevant för en MVP. Det är din uppgift att bestämma vad som ska göras och hur det ska göras. Du ska använda designfilen som en guide.

Det enda kravet som finns är att profileringen ska se likadan ut, vilket innebär att struktur och färger ska följas men innehållet och funktionaliteten behöver inte finnas eller kan efterliknas. Det finns dessutom massa delar om inte är synliga såsom inloggningssystem och andra delsystem som ligger bakom sidan, det är sånt du måste identifiera själv och skapa. Så du kan hitta på vad du vill egenligen så länge du följer designstrukturen och färgschemat dvs profileringen.

Det ska i slutändan finnas en så kallad MVP i slutändan. Vad för funktionalitet som du har valt ska vara med i denna MVP är helt upp till dig att bestämma. Det är du som är utvecklaren :)

Du ska bygga systemet genom att använda dig av flera olika API-lösningar (distribuerade system/microservices) som baseras på ASP.NET Core Web Api. Hur systemen kommunicerar med varandra, om det är via REST, gRPC, ESB etc. det är helt och hållet upp till dig att bestämma, du är som sagt utvecklaren :)

KRITERIER FÖR FRONTEND
Du måste ha en frontend-applikation som har minimal funktionalitet (MVP) så att det kan anses vara ett event-system. Det är upp till dig att avgöra vad för funktionalitet som måste vara med för att uppfylla detta krav. Frontend-applikationen kan vara byggd i React (rekommenderat), Vue, Angular, Blazor WebAssembly, eller ASP.NET Core. Denna applikation ska ha en egen repository och ska publiceras i valfri molntjänstlösning (rekommenderat Azure Static Web App).

KRITERIER FÖR BACKEND
Du kommer behöva använda dig av flera olika backend-lösningar (distribuerade system) för att skapa en MVP. Hur många är helt beroende på vad du väljer att skapa för typ av funktionalitet för att uppfylla kravet för en MVP för ett event-system. Men skulle tippa på 2-3 distribuerade system (minst). Dessa applikationer ska ha en egna repositories och ska publiceras i valfri molntjänstlösning (rekommenderat Azure Web App / Azure Function App). Dina applikationer kan kommunicera med varandra och med din frontendapplikation med hjälp av HTTP, gRPC, ESB eller vad du nu väljer som kan vara en lämplig lösning.

ÖVRIGA KRITERIER FÖR GODKÄNT:

Du måste lämna in en fungerande MVP (Minimum Viable Product) applikation.
Du måste uppfylla kravet som står under sektionen KRITERIER FÖR FRONTEND.
Du måste uppfylla kravet som står under sektionen KRITERIER FÖR BACKEND.
Du måste använda dig av en GitHub-Organization där du har alla dina repositories samlade.
Du måste publicera alla dina applikationer i en valfri molntjänst (rekommenderat Azure).
Du måste ha en publik adress som går att gå in på som visar din hemsida.
