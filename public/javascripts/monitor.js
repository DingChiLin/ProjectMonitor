const batchId = 11;
const columns = {
    id: '#',
    name: 'Name',
    github: 'GitHub',
    // assignmentType: 'Assignment Type',
    part: 'Part',
    pr: 'PR',
    status: 'Status'
}

let students, assignments, assignmentMap, progresses, progressesMap, status, statusMap;

function addAssignmentSelector(assignmentSelector, assignments, latestAssignmentId) {
    assignmentSelector.options.length = 0;
    for(assignment of assignments) {
        const option = document.createElement('option');
        option.value = assignment.id;
        option.textContent = assignment.name;
        assignmentSelector.append(option);
    }
    if (latestAssignmentId) {
        assignmentSelector.value = latestAssignmentId;
    }
}

function updatePRLink(dom, studentId, assignmentId) {
    console.log(dom);
    dom.textContent = "";
    dom.setAttribute('href', "");
    if(assignmentId) {
        console.log(studentId);
        console.log(assignmentId)
        console.log(progressesMap[studentId])
        console.log(progressesMap[studentId].get(assignmentId));
        const progress = progressesMap[studentId].get(assignmentId);
        const assignment = assignmentMap[assignmentId]
        console.log(progress);
        console.log(assignment);
        if (progress && assignment) {
            const url = progress.pr_link;
            const name = assignment.name;
            dom.textContent = name;
            dom.setAttribute('href', url)
        }
    }
}

function updateStatus(dom, studentId, assignmentId) {
    dom.textContent = "";
    if(assignmentId) {
        const progress = progressesMap[studentId].get(assignmentId);
        if (progress) {
            const statusId = progress.status_id;
            const status = statusMap[statusId];
            dom.textContent = status;
            switch (statusId) {
                case 1:
                    dom.setAttribute('style', "color:orange;");
                    break;
                case 2:
                    dom.setAttribute('style', "color:red;");
                    break;
                case 3:
                    dom.setAttribute('style', "color:green;");
                    break;
            }
        }
    }
}

function main() {
    const monitorTableHeader = document.getElementById('monitor_table').getElementsByTagName('thead')[0];
    const monitorTableBody = document.getElementById('monitor_table').getElementsByTagName('tbody')[0];

    for(header of Object.values(columns)) {
        let tableHeader = document.createElement('th');
        tableHeader.setAttribute('scope', 'row');
        tableHeader.textContent = header;
        monitorTableHeader.appendChild(tableHeader);
    }

    const url = `../api/1.0/monitor/progresses/${batchId}`;
    $.ajax({
        type: "GET",
        url,
        success: function(data)
        {
            students = data.students;
            assignments = data.assignments;
            progresses = data.progresses;
            status = data.status;

            assignmentMap = assignments.reduce((obj, assignment) => {
                obj[assignment.id] = assignment;
                return obj;
            }, {});

            progressesMap = progresses.reduce((obj, progress) => {
                const studentId = progress.student_id;
                const assignmentId = progress.assignment_id;
                if (!obj[studentId]) {
                    obj[studentId] = new Map();
                }
                obj[studentId].set(assignmentId, progress);
                return obj;
            }, {});

            statusMap = status.reduce((obj, stat) => {
                obj[stat.id] = stat.name;
                return obj;
            }, {})

            for (let id in students) {
                const student = students[id];
                console.log(student);
                let tableRow = document.createElement('tr');
                let latestAssignmentId;
                if (progressesMap[student.id]) {
                    latestAssignmentId = Array.from(progressesMap[student.id].keys()).pop();
                }
                for (let col of Object.keys(columns)) {
                    let tableData = document.createElement('td');

                    switch (col) {
                        case 'id':
                            tableData.textContent = student.id;
                            break;
                        case 'name':
                            tableData.textContent = student.name;
                            break;
                        case 'github':
                            const githubLink = document.createElement('a');
                            githubLink.textContent = col;
                            githubLink.setAttribute('href', student.github_link);
                            tableData.appendChild(githubLink);
                            break;
                        // case 'assignmentType':
                        //     const typeSelector = document.createElement('select');
                        //     typeSelector.setAttribute('class', "custom-select custom-select-sm");
                        //     for(let type of Object.keys(assignmentMap)) {
                        //         const option = document.createElement('option');
                        //         option.value = type;
                        //         option.textContent = type;

                        //         typeSelector.appendChild(option);
                        //     }
                        //     typeSelector.addEventListener("change", (e) => {
                        //         const type = e.target.value
                        //         const parts = assignmentMap[type].map(a => ({id: a.part, name: a.name}));
                        //         addPartSelector($('.partSelector')[id], parts);
                        //     })
                        //     tableData.appendChild(typeSelector);
                        //     break;
                        case 'part':
                            const partSelector = document.createElement('select');
                            partSelector.setAttribute('class', "custom-select custom-select-sm partSelector");

                            partSelector.addEventListener("change", (e) => {
                                const studentId = student.id;
                                const assignmentId = parseInt(e.target.value);
                                const assignmentName = e.target.options[e.target.selectedIndex].textContent;
                                const prLinkDom = $(`#pr_link_${studentId}`)[0];
                                updatePRLink(prLinkDom, studentId, assignmentId);
                                const statusDOM = $(`#status_${studentId}`)[0];
                                updateStatus(statusDOM, studentId, assignmentId);
                            })

                            addAssignmentSelector(partSelector, assignments, latestAssignmentId);
                            tableData.appendChild(partSelector);
                            break;
                        case 'pr':
                            const prLinkDOM = document.createElement('a');
                            prLinkDOM.setAttribute('id', `pr_link_${student.id}`);
                            tableData.appendChild(prLinkDOM);

                            updatePRLink(prLinkDOM, student.id, latestAssignmentId);
                            break;
                        case 'status':
                            const statusDOM = document.createElement('p');
                            statusDOM.setAttribute('id', `status_${student.id}`);
                            tableData.appendChild(statusDOM);

                            updateStatus(statusDOM, student.id, latestAssignmentId);
                            break;
                        default:
                            tableData.textContent = "";
                    }

                    tableRow.append(tableData);
                }
                monitorTableBody.appendChild(tableRow);
            }
        },
        error: function(err)
        {
            console.log(err);
        }
    });

}

main();