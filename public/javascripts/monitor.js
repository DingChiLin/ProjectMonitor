const Monitor = {
    columns: {
        id: '#',
        name: 'Name',
        github: 'GitHub',
        part: 'Part',
        pr: 'PR',
        page: 'Page',
        status: 'Status'
    },

    init: async function(batchId) { // need to await it initialize.
        const data = await Promise.resolve($.ajax('../api/1.0/monitor/progresses/' + batchId));
        this.students = data.students;
        this.assignments = data.assignments;
        this.progresses = data.progresses;
        this.status = data.status;

        this.studentMap = this.students.reduce((obj, student) => {
            obj[student.id] = student;
            return obj;
        }, {});

        this.assignmentMap = this.assignments.reduce((obj, assignment) => {
            obj[assignment.id] = assignment;
            return obj;
        }, {});

        this.progressesMap = this.progresses.reduce((obj, progress) => {
            const studentId = progress.student_id;
            const assignmentId = progress.assignment_id;
            if (!obj[studentId]) {
                obj[studentId] = new Map();
            }
            obj[studentId].set(assignmentId, progress);
            return obj;
        }, {});

        this.statusMap = this.status.reduce((obj, stat) => {
            obj[stat.id] = stat.name;
            return obj;
        }, {});
    },

    addAssignmentSelector: function(assignmentSelector, latestAssignmentId) {
        assignmentSelector.options.length = 0;
        for(assignment of this.assignments) {
            const option = document.createElement('option');
            option.value = assignment.id;
            option.textContent = assignment.name;
            assignmentSelector.append(option);
        }
        if (latestAssignmentId) {
            assignmentSelector.value = latestAssignmentId;
        }
    },
    
    updatePRLink: function(dom, studentId, assignmentId) {
        dom.textContent = "";
        dom.setAttribute('href', "");
        if(assignmentId) {
            const progress = this.progressesMap[studentId].get(assignmentId);
            const assignment = this.assignmentMap[assignmentId]
            if (progress && assignment) {
                const url = progress.pr_link;
                const name = assignment.name;
                dom.textContent = name;
                dom.setAttribute('href', url)
            }
        }
    },
    
    updatePageLink: function(dom, studentId, assignmentId) {
        dom.textContent = "";
        dom.setAttribute('href', "");
        if(assignmentId) {
            const student = this.studentMap[studentId];
            const assignment = this.assignmentMap[assignmentId];
            if (student && assignment) {
                const route = assignment.route ? assignment.route : '';
                const url = student.server + route;
                dom.textContent = 'page';
                dom.setAttribute('href', url)
            }
        }
    },
    
    updateStatus: function(dom, studentId, assignmentId) {
        dom.textContent = "";
        if(assignmentId) {
            const progress = this.progressesMap[studentId].get(assignmentId);
            if (progress) {
                const statusId = progress.status_id;
                const status = this.statusMap[statusId];
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
    },

    show: function() {
        const monitorTableHeader = document.getElementById('monitor_table').getElementsByTagName('thead')[0];
        const monitorTableBody = document.getElementById('monitor_table').getElementsByTagName('tbody')[0];
    
        for(header of Object.values(this.columns)) {
            let tableHeader = document.createElement('th');
            tableHeader.setAttribute('scope', 'row');
            tableHeader.textContent = header;
            monitorTableHeader.appendChild(tableHeader);
        }

        for (let student of this.students) {
            let tableRow = document.createElement('tr');
            let latestAssignmentId;
            if (this.progressesMap[student.id]) {
                latestAssignmentId = Array.from(this.progressesMap[student.id].keys()).pop();
            }
            for (let col of Object.keys(this.columns)) {
                let tableData = document.createElement('td');

                switch (col) {
                    case 'id':
                        tableData.textContent = student.id;
                        break;
                    case 'name':
                        tableData.textContent = student.name;
                        break;
                    case 'github':
                        const githubLinkDOM = document.createElement('a');
                        githubLinkDOM.textContent = col;
                        githubLinkDOM.setAttribute('target', '_blank');
                        githubLinkDOM.setAttribute('rel', 'noopener noreferrer');
                        githubLinkDOM.setAttribute('href', student.github_link);
                        tableData.appendChild(githubLinkDOM);
                        break;
                    case 'part':
                        const partSelector = document.createElement('select');
                        partSelector.setAttribute('class', "custom-select custom-select-sm partSelector");

                        partSelector.addEventListener("change", (e) => {
                            const studentId = student.id;
                            const assignmentId = parseInt(e.target.value);
                            // const assignmentName = e.target.options[e.target.selectedIndex].textContent;
                            const prLinkDom = $(`#pr_link_${studentId}`)[0];
                            const pageLinkDom = $(`#page_link_${studentId}`)[0];
                            this.updatePRLink(prLinkDom, studentId, assignmentId);
                            this.updatePageLink(pageLinkDom, studentId, assignmentId);
                            const statusDOM = $(`#status_${studentId}`)[0];
                            this.updateStatus(statusDOM, studentId, assignmentId);
                        })

                        this.addAssignmentSelector(partSelector, latestAssignmentId);
                        tableData.appendChild(partSelector);
                        break;
                    case 'pr':
                        const prLinkDOM = document.createElement('a');
                        prLinkDOM.setAttribute('target', '_blank');
                        prLinkDOM.setAttribute('rel', 'noopener noreferrer');
                        prLinkDOM.setAttribute('id', `pr_link_${student.id}`);
                        tableData.appendChild(prLinkDOM);

                        this.updatePRLink(prLinkDOM, student.id, latestAssignmentId);
                        break;
                    case 'page':
                        const pageLinkDOM = document.createElement('a');
                        pageLinkDOM.setAttribute('target', '_blank');
                        pageLinkDOM.setAttribute('rel', 'noopener noreferrer');
                        pageLinkDOM.setAttribute('id', `page_link_${student.id}`);
                        tableData.appendChild(pageLinkDOM);

                        this.updatePageLink(pageLinkDOM, student.id, latestAssignmentId);
                        break;
                    case 'status':
                        const statusDOM = document.createElement('p');
                        statusDOM.setAttribute('id', `status_${student.id}`);
                        tableData.appendChild(statusDOM);

                        this.updateStatus(statusDOM, student.id, latestAssignmentId);
                        break;
                    default:
                        tableData.textContent = "";
                }

                tableRow.append(tableData);
            }
            monitorTableBody.appendChild(tableRow);
        }
    }

};

async function main() {
    await Monitor.init(11);
    Monitor.show();
}

main();