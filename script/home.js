const allBtn = document.getElementById("allBtn");
const cards = document.getElementById("card");
const openedBtn = document.getElementById("openedBtn");
const closedBtn = document.getElementById("closedBtn");
const issueCountElement = document.getElementById("issueCount");
let allIssues = [];

async function allIssuesLoad() {
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues`)
    const data = await res.json();
    allIssues = data.data;
    display(allIssues);

}



function display(allData){
    console.log(allData)
    cards.innerHTML = "";
    issueCountElement.innerText = allData.length;

    allData.forEach(data => {
        // console.log(data);
        
        
        const card = document.createElement("div");
        
        card.innerHTML = `<div >
                    <div class="card bg-base-100 shadow-xl p-4 rounded-xl border-t-4 border-t-[#00A96E] ">
                        <div class="flex justify-between mb-3">
                            <img src="./assets/Open-Status.png" alt="">
                            <div class="badge badge-soft badge-error font-semibold text-[12px] uppercase ">${data.priority}</div>
                        </div>
                        
                        <div class="space-y-3 mb-4">
                            <h2 class="card-title font-semibold text-sm">${data.title}</h2>
                            <p class="line-clamp-2 text-[12px] text-[#64748B]">${data.description}</p>
                            <div class="flex gap-2">
                                <div class="badge badge-soft font-semibold badge-error border-[#FECACA] rounded-xl text-[12px] uppercase">${data.labels[0]}</div>
                                <div class="badge font-semibold bg-[#FFF8DB] border-[#FDE68A] rounded-xl text-[#D97706] text-[12px] uppercase"><i class="fa-solid fa-bug"></i>${data.labels[1]}</div>
                            </div>
                        </div>
                        <div class="border-[1px] border-gray-300">
                        </div>
                        <div class="mt-4 space-y-1">
                            <p class="text-[12px] text-[#64748B]">#1 by ${data.author}</p>
                            <p class="text-[12px] text-[#64748B]">${data.createdAt}</p>
                        </div>
                    </div>
                    
                </div>
        `;
        cards.appendChild(card)
    });
}

allBtn.addEventListener("click", () => {
    display(allIssues);
});

openedBtn.addEventListener("click", () => {
    const openData = allIssues.filter(issue => issue.status.toLowerCase() === "open");
    display(openData);
});

closedBtn.addEventListener("click", () => {
    const closedData = allIssues.filter(issue => issue.status.toLowerCase() === "closed");
    display(closedData);
});

allIssuesLoad();