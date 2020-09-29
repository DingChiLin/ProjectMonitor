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
        const self = this;

        this.batchId = batchId
        await this.getLatestProgress(batchId);

        $("#current_assignment_btn").click(async function() {
            await self.getLatestProgress(self.batchId);
            for (student of self.students) {
                self.changeCurrentAssignment(student.id, self.currentAssignmentId);
            }
        });

        $("#latest_progress_btn").click(async function() {
            await self.getLatestProgress(self.batchId);
            for (student of self.students) {
                if(self.progressesMap[student.id]) {
                    latestAssignmentId = Array.from(self.progressesMap[student.id].keys()).pop();
                    self.changeCurrentAssignment(student.id, latestAssignmentId);
                }
            }
        });
    },

    getLatestProgress: async function(batchId) {
        const data = await Promise.resolve($.ajax('../api/1.0/monitor/progresses/' + batchId));
        this.students = data.students;
        this.assignments = data.assignments;
        this.progresses = data.progresses;
        this.status = data.status;
        this.currentAssignmentId = data.currentAssignmentId;

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

    changeCurrentAssignment: function(studentId, assignmentId) {
        const partSelectorDom = $(`#partSelector_${studentId}`)[0];
        const statusDOM = $(`#status_${studentId}`)[0];
        const prLinkDom = $(`#pr_link_${studentId}`)[0];
        const pageLinkDom = $(`#page_link_${studentId}`)[0];
        partSelectorDom.value = assignmentId;
        this.updatePRLink(prLinkDom, studentId, assignmentId);
        this.updatePageLink(pageLinkDom, studentId, assignmentId);
        this.updateStatus(statusDOM, studentId, assignmentId);
    },

    addAssignmentSelector: function(assignmentSelector, assignmentId) {
        assignmentSelector.options.length = 0;
        for(assignment of this.assignments) {
            const option = document.createElement('option');
            option.value = assignment.id;
            option.textContent = assignment.name;
            assignmentSelector.append(option);
        }
        if (assignmentId) {
            assignmentSelector.value = assignmentId;
        }
    },
    
    updatePRLink: function(dom, studentId, assignmentId) {
        dom.textContent = "";
        dom.setAttribute('href', "");
        if(assignmentId && this.progressesMap[studentId]) {
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
        if(assignmentId && this.progressesMap[studentId]) {
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
            if (header == '#') {
                tableHeader.setAttribute('width', '4%');
            } else {
                tableHeader.setAttribute('width', '16%');
            }
            tableHeader.textContent = header;
            monitorTableHeader.appendChild(tableHeader);
        }

        for (let student of this.students) {
            let tableRow = document.createElement('tr');
            tableRow.setAttribute('height', '70px');
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
                        githubLinkDOM.setAttribute('href', `https://github.com/${student.github_name}/Backend-Class-Batch${this.batchId}`);
                        tableData.appendChild(githubLinkDOM);
                        break;
                    case 'part':
                        const partSelector = document.createElement('select');
                        partSelector.setAttribute('class', "custom-select custom-select-sm");
                        partSelector.setAttribute('id', `partSelector_${student.id}`);
                        partSelector.addEventListener("change", (e) => {
                            const studentId = student.id;
                            const assignmentId = parseInt(e.target.value);
                            this.changeCurrentAssignment(studentId, assignmentId)
                        })

                        this.addAssignmentSelector(partSelector, this.currentAssignmentId);
                        tableData.appendChild(partSelector);
                        break;
                    case 'pr':
                        const prLinkDOM = document.createElement('a');
                        prLinkDOM.setAttribute('target', '_blank');
                        prLinkDOM.setAttribute('rel', 'noopener noreferrer');
                        prLinkDOM.setAttribute('id', `pr_link_${student.id}`);
                        tableData.appendChild(prLinkDOM);

                        this.updatePRLink(prLinkDOM, student.id, this.currentAssignmentId);
                        break;
                    case 'page':
                        const pageLinkDOM = document.createElement('a');
                        pageLinkDOM.setAttribute('target', '_blank');
                        pageLinkDOM.setAttribute('rel', 'noopener noreferrer');
                        pageLinkDOM.setAttribute('id', `page_link_${student.id}`);
                        tableData.appendChild(pageLinkDOM);

                        this.updatePageLink(pageLinkDOM, student.id, this.currentAssignmentId);
                        break;
                    case 'status':
                        const statusDOM = document.createElement('p');
                        statusDOM.setAttribute('id', `status_${student.id}`);
                        tableData.appendChild(statusDOM);

                        this.updateStatus(statusDOM, student.id, this.currentAssignmentId);
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
    await Monitor.init(12);
    Monitor.show();
}

main();
