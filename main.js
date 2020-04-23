document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';
 
  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));
  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}



const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id === String(id));
  currentIssue.status = 'Closed';
  currentIssue.description = 'Issue is Closed'
  location.reload()
  localStorage.setItem('issues', JSON.stringify(issues));
}





const deleteIssue = id => {
  const conf = confirm('Are you confirm, to delete this issue?')
  if (conf) {
    const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter(issues=> issues.id != id )
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  document.getElementById('totalIssue').innerText=issues.length - 1
  fetchIssues();
  
  }

}
 



const fetchIssues = () => {
  
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';
  
  for (var i = 0; i < issues.length; i++) {
    document.getElementById('totalIssue').innerText=issues.length
    const {id, description, severity, assignedTo, status} = issues[i];
    
    issuesList.innerHTML +=   `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span id='stat' class="label label-info"> ${status} </span></p>
                              <h3 id='text'> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#"  onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
  }
}
