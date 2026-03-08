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



function display(allData) {
    cards.innerHTML = "";
    issueCountElement.innerText = allData.length;

    allData.forEach(data => {
        // console.log(data);

        let borderColorClass = "";
        if (data.status.toLowerCase() === "open") {
            borderColorClass = "border-t-[#00A96E]";
        } else {
            borderColorClass = "border-t-[#A855F7]";
        }

        const card = document.createElement("div");

        let labelsHTML = data.labels.map(label => {

            let icon = "";
            let styleClasses = "";
            if (label.toLowerCase() === "bug") {
                icon = `<i class="fa-solid fa-bug"></i>`;
                styleClasses = "bg-[#FEE2E2] text-[#EF4444] border-[#FECACA]";
            }
            else if (label.toLowerCase() === "enhancement") {
                icon = `<i class="fa-solid fa-wand-magic-sparkles"></i>`;
                styleClasses = "bg-[#E0F2FE] text-[#0284C7] border-[#BAE6FD]";
            }
            else if (label.toLowerCase() === "help wanted") {
                icon = `<i class="fa-solid fa-life-ring"></i>`;
                styleClasses = "bg-[#FFF8DB] text-[#D97706] border-[#FDE68A]";
            }
            else {
                icon = `<i class="fa-solid fa-tag"></i>`;
                styleClasses = "bg-[#F3F4F6] text-[#4B5563] border-[#E5E7EB]";
            }
            return `<div class="badge font-semibold border-[1px] rounded-xl text-[12px] uppercase gap-1 py-3 px-2 ${styleClasses}">
                ${icon} ${label}
            </div>`;
        }).join('');

        card.innerHTML = `<div >
                    <div class="card bg-base-100 shadow-xl p-4 rounded-xl border-t-4 ${borderColorClass} ">
                        <div class="flex justify-between mb-3">
                            <img src="./assets/Open-Status.png" alt="">
                            <div class="badge badge-soft badge-error font-semibold text-[12px] uppercase ">${data.priority}</div>
                        </div>
                        
                        <div class="space-y-3 mb-4">
                            <h2 class="card-title font-semibold text-sm">${data.title}</h2>
                            <p class="line-clamp-2 text-[12px] text-[#64748B]">${data.description}</p>
                            <div class="flex gap-2 flex-wrap">
                                    ${labelsHTML}
                            </div>
                        </div>
                        <div class="border-[1px] border-gray-300">
                        </div>
                        <div class="mt-4 space-y-1">
                            <p class="text-[12px] text-[#64748B]">#${data.id || '1'} by ${data.author}</p>
                            <p class="text-[12px] text-[#64748B]">${new Date(data.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                    
                </div>
        `;
        cards.appendChild(card);
    });
}

function setActiveButton(activeBtn) {
    const allButtons = [allBtn, openedBtn, closedBtn];
    allButtons.forEach(btn => {
        btn.classList.remove("btn-primary");
        btn.classList.add("btn-outline");
    });

    activeBtn.classList.remove("btn-outline");
    activeBtn.classList.add("btn-primary");
}


allBtn.addEventListener("click", () => {
    setActiveButton(allBtn);
    display(allIssues);
});

openedBtn.addEventListener("click", () => {
    setActiveButton(openedBtn);
    const openData = allIssues.filter(issue => issue.status.toLowerCase() === "open");
    display(openData);
});

closedBtn.addEventListener("click", () => {
    setActiveButton(closedBtn);
    const closedData = allIssues.filter(issue => issue.status.toLowerCase() === "closed");
    display(closedData);
});


setActiveButton(allBtn);
allIssuesLoad();