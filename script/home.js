const allBtn = document.getElementById("allBtn");
const cards = document.getElementById("card");
const openedBtn = document.getElementById("openedBtn");
const closedBtn = document.getElementById("closedBtn");
const issueCountElement = document.getElementById("issueCount");

const loadingSpinner = document.getElementById("loadingSpinner");

function showLoading() {
    loadingSpinner.classList.remove("hidden");
    cards.innerHTML = "";
}

function hideLoading() {
    loadingSpinner.classList.add("hidden");
}

let allIssues = [];

async function allIssuesLoad() {
    showLoading();
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues`)
    const data = await res.json();
    allIssues = data.data;
    hideLoading();
    display(allIssues);

}



function display(allData) {
    cards.innerHTML = "";
    issueCountElement.innerText = allData.length;

    allData.forEach(data => {




        let borderColorClass = "";
        if (data.status.toLowerCase() === "open") {
            borderColorClass = "border-t-[#00A96E]";
        } else {
            borderColorClass = "border-t-[#A855F7]";
        }




        let priorityClass = "";
        const priorityLevel = data.priority ? data.priority.toLowerCase() : "";
        let leftSideImage = "./assets/Open-Status.png";

        if (priorityLevel === "high") {
            priorityClass = "badge-error bg-[#FEE2E2] text-[#EF4444] border-none";
        } else if (priorityLevel === "medium") {
            priorityClass = "badge-warning bg-[#FEF3C7] text-[#D97706] border-none";
        } else if (priorityLevel === "low") {
            priorityClass = "badge-success bg-[#DCFCE7] text-[#16A34A] border-none";
            leftSideImage = "./assets/Closed- Status .png";
        } else {
            priorityClass = "badge-neutral";
        }



        const card = document.createElement("div");

        card.className = "cursor-pointer h-full";



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
                    <div class="card bg-base-100 shadow-xl p-4 rounded-xl border-t-4 h-full flex flex-col ${borderColorClass} ">
                        <div class="flex justify-between mb-3">
                            <img src="${leftSideImage}" alt="">
                            <div class="badge badge-soft badge-error font-semibold text-[12px] uppercase ${priorityClass}">${data.priority}</div>
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

        card.addEventListener("click", () => {
            const issueId = data.id || data._id;
            openIssueModal(issueId);
        });

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


// allBtn.addEventListener("click", () => {
//     setActiveButton(allBtn);
//     showLoading();
//     setTimeout(() => {
//         hideLoading();
//         display(allIssues);
//     }, 100)
// });

// openedBtn.addEventListener("click", () => {
//     setActiveButton(openedBtn);
//     showLoading();
//     hideLoading();
//     const openData = allIssues.filter(issue => issue.status.toLowerCase() === "open");
//     display(openData);
// });

// closedBtn.addEventListener("click", () => {
//     setActiveButton(closedBtn);
//     showLoading();
//     hideLoading();
//     const closedData = allIssues.filter(issue => issue.status.toLowerCase() === "closed");
//     display(closedData);
// });


allBtn.addEventListener("click", async () => {
    searchInput.value = "";
    setActiveButton(allBtn);
    showLoading();
    
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues`);
    const data = await res.json();
    
    hideLoading(); 
    display(data.data);
});

openedBtn.addEventListener("click", async () => {
    searchInput.value = "";
    setActiveButton(openedBtn);
    showLoading();
    
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues`);
    const data = await res.json();
    
    hideLoading();
    const openData = data.data.filter(issue => issue.status.toLowerCase() === "open");
    display(openData);
});

closedBtn.addEventListener("click", async () => {
    searchInput.value = "";
    setActiveButton(closedBtn);
    showLoading();
    
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues`);
    const data = await res.json();
    
    hideLoading();
    const closedData = data.data.filter(issue => issue.status.toLowerCase() === "closed");
    display(closedData);
});

document.getElementById("modal-title")
document.getElementById("modal-desc")
document.getElementById("modal-labels")
document.getElementById("modal-author")
document.getElementById("modal-priority")
document.getElementById("modal-date")
document.getElementById("modal-status-badge")

async function openIssueModal(id) {
    const modal = document.getElementById("issue_modal");
    modal.showModal();

    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
    const responseData = await res.json();

    const issue = responseData.data;

    document.getElementById("modal-title").innerText = issue.title;
    document.getElementById("modal-desc").innerText = issue.description;
    document.getElementById("modal-author").innerText = issue.author;
    document.getElementById("modal-priority").innerText = issue.priority;
    document.getElementById("modal-date").innerText = new Date(issue.createdAt).toLocaleDateString();
    

    document.getElementById("modal-assignee").innerText = issue.author;


    let statusColor = issue.status.toLowerCase() === "open" ? "text-[#00A96E] bg-[#DCFCE7]" : "text-[#8B5CF6] bg-[#EDE9FE]";
    document.getElementById("modal-status-badge").innerHTML = `<div class="badge ${statusColor} border-none font-bold uppercase p-3">${issue.status}</div>`;
    
    if (issue.labels) {
        document.getElementById("modal-labels").innerHTML = issue.labels.map(label => {
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
    }
}

const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", async (event) => {
    const searchText = event.target.value.trim(); 
    setActiveButton(allBtn);
    showLoading(); 

    if (searchText) {
        const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`);
        const data = await res.json();
        
        hideLoading();
        display(data.data); 
    } else {
        hideLoading();
        display(allIssues);
    }
});

setActiveButton(allBtn);
allIssuesLoad();