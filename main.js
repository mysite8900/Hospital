// State management
let state = {
  isLoggedIn: false,
  username: '',
  activeSection: 'appointment',
  doctors: [],
  nurses: [],
  patients: [],
  appointments: [],
  reports: [],
  bills: [],
  modals: {
    schedulePatient: false,
    findAppointment: false,
    addPatient: false,
    addBill: false,
    addReport: false,
    editAppointment: false,
    viewPatient: false,
    viewSchedule: false,
    viewReport: false,
    confirmDelete: false
  },
  selectedItem: null
};

// DOM Elements
const root = document.getElementById('root');

// Initial render
renderApp();

// Main render function
function renderApp() {
  if (!state.isLoggedIn) {
    renderLoginForm();
  } else {
    renderDashboard();
  }
}

// Login Form
function renderLoginForm() {
  const loginForm = `
    <div class="flex-center min-h-screen p-6">
      <div class="card max-w-md w-full">
        <div class="p-6">
          <div class="text-center">
            <div class="logo-container" style="margin: 0 auto 20px; width: 240px; height: 80px; display: flex; overflow: hidden; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); border-radius: 8px;">
              <div class="logo-left" style="width: 40%; background: linear-gradient(135deg, #0056b3, #007bff); color: white; display: flex; flex-direction: column; justify-content: center; align-items: center; position: relative;">
                <div class="logo-main" style="font-size: 24px; font-weight: bold; color: white; letter-spacing: 1px; position: relative; z-index: 2;">PCB</div>
                <div class="logo-sub" style="font-size: 12px; color: rgba(255, 255, 255, 0.9); position: relative; z-index: 2;">Hospital<sup style="font-size: 8px; top: -5px;">TM</sup></div>
                <div style="content: ''; position: absolute; right: -15px; top: 0; height: 100%; width: 30px; background: linear-gradient(135deg, #0056b3, #007bff); transform: skewX(-15deg);"></div>
              </div>
              <div class="logo-right" style="width: 60%; background-color: white; display: flex; flex-direction: column; justify-content: center; padding-left: 15px; position: relative;">
                <div class="hospital-name" style="font-size: 16px; font-weight: bold; color: #0056b3; margin-bottom: 5px;">Healthcare Solutions</div>
                <div class="hospital-tagline" style="font-size: 10px; color: #6c757d;">Excellence in Medical Care</div>
                <div class="cross-icon" style="position: absolute; right: 20px; top: 30px; z-index: 1;"></div>
                <div style="position: absolute; width: 4px; height: 16px; background-color: rgba(0, 123, 255, 0.2); right: 28px; top: 32px;"></div>
                <div style="position: absolute; width: 16px; height: 4px; background-color: rgba(0, 123, 255, 0.2); right: 22px; top: 38px;"></div>
              </div>
            </div>
            <h2 class="mt-2 text-2xl">Login</h2>
            <p class="mt-2 text-sm text-gray-600">
              Please enter your credentials to access the system
            </p>
          </div>

          <form id="login-form" class="mt-8 space-y-6">
            <div class="form-group">
              <label class="form-label" for="username">User ID</label>
              <input 
                type="text" 
                id="username" 
                class="form-control" 
                placeholder="Enter your user ID" 
                required
              />
            </div>

            <div class="form-group">
              <label class="form-label" for="password">Password</label>
              <input 
                type="password" 
                id="password" 
                class="form-control" 
                placeholder="Enter your password" 
                required
              />
            </div>

            <button type="submit" class="btn btn-primary w-full">
              Login
            </button>

            <div class="text-center text-xs text-gray-500">
              <p></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;

  root.innerHTML = loginForm;

  // Add login form event listener
  document.getElementById('login-form').addEventListener('submit', handleLogin);
}

// Login handler
function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Simple validation for demo purposes
  if (username === 'Priti' && password === '8900') {
    state.isLoggedIn = true;
    state.username = username;
    
    // Fetch initial data
    fetchData();
    
    // Re-render app
    renderApp();
  } else {
    alert('Invalid username or password. Please try again.');
  }
}

// Dashboard
function renderDashboard() {
  const dashboard = `
    <div class="layout">
      <!-- Modern Vertical Sidebar -->
      <div class="sidebar" style="width: 250px; background: linear-gradient(to bottom, #ffffff, #f8f9fa); border-right: 1px solid #e9ecef; padding: 0; display: flex; flex-direction: column; height: 100vh; position: fixed; left: 0; top: 0; z-index: 100;">
        <div class="sidebar-logo" style="padding: 20px 15px; border-bottom: 1px solid #e9ecef;">
          <div class="logo-container" style="margin: 0 auto 10px; width: 200px; height: 70px; display: flex; overflow: hidden; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); border-radius: 8px;">
            <div class="logo-left" style="width: 40%; background: linear-gradient(135deg, #0056b3, #007bff); color: white; display: flex; flex-direction: column; justify-content: center; align-items: center; position: relative;">
              <div class="logo-main" style="font-size: 22px; font-weight: bold; color: white; letter-spacing: 1px; position: relative; z-index: 2;">PCB</div>
              <div class="logo-sub" style="font-size: 11px; color: rgba(255, 255, 255, 0.9); position: relative; z-index: 2;">Hospital<sup style="font-size: 7px; top: -5px;">TM</sup></div>
              <div style="content: ''; position: absolute; right: -15px; top: 0; height: 100%; width: 30px; background: linear-gradient(135deg, #0056b3, #007bff); transform: skewX(-15deg);"></div>
            </div>
            <div class="logo-right" style="width: 60%; background-color: white; display: flex; flex-direction: column; justify-content: center; padding-left: 15px; position: relative;">
              <div class="hospital-name" style="font-size: 14px; font-weight: bold; color: #0056b3; margin-bottom: 3px;">Healthcare Solutions</div>
              <div class="hospital-tagline" style="font-size: 9px; color: #6c757d;">Excellence in Medical Care</div>
              <div class="cross-icon" style="position: absolute; right: 15px; top: 25px; z-index: 1;"></div>
              <div style="position: absolute; width: 3px; height: 14px; background-color: rgba(0, 123, 255, 0.2); right: 21px; top: 28px;"></div>
              <div style="position: absolute; width: 14px; height: 3px; background-color: rgba(0, 123, 255, 0.2); right: 16px; top: 33px;"></div>
            </div>
          </div>
          <div style="margin-top: 10px; text-align: center; color: #495057; font-size: 14px; padding: 5px; background-color: #e9f2ff; border-radius: 4px;">
            Welcome, ${state.username}
          </div>
        </div>
        
        <!-- Vertical Navigation Menu -->
        <nav style="padding: 15px 0; flex-grow: 1; overflow-y: auto;">
          <div class="nav-menu" style="display: flex; flex-direction: column; gap: 5px;">
            <button 
              class="nav-item ${state.activeSection === 'appointment' ? 'active-nav' : ''}" 
              data-section="appointment"
              style="display: flex; align-items: center; padding: 12px 20px; border: none; background: ${state.activeSection === 'appointment' ? 'linear-gradient(to right, #007bff, #0056b3)' : 'transparent'}; color: ${state.activeSection === 'appointment' ? 'white' : '#495057'}; text-align: left; font-size: 14px; font-weight: 500; border-radius: 0; position: relative; transition: all 0.3s; margin: 0 6px; border-radius: 8px;"
            >
              <span style="display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; margin-right: 12px; background: ${state.activeSection === 'appointment' ? 'rgba(255, 255, 255, 0.2)' : '#e9ecef'}; border-radius: 6px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              </span>
              Appointments
            </button>
            
            <button 
              class="nav-item ${state.activeSection === 'patient-details' ? 'active-nav' : ''}" 
              data-section="patient-details"
              style="display: flex; align-items: center; padding: 12px 20px; border: none; background: ${state.activeSection === 'patient-details' ? 'linear-gradient(to right, #007bff, #0056b3)' : 'transparent'}; color: ${state.activeSection === 'patient-details' ? 'white' : '#495057'}; text-align: left; font-size: 14px; font-weight: 500; border-radius: 0; position: relative; transition: all 0.3s; margin: 0 6px; border-radius: 8px;"
            >
              <span style="display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; margin-right: 12px; background: ${state.activeSection === 'patient-details' ? 'rgba(255, 255, 255, 0.2)' : '#e9ecef'}; border-radius: 6px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </span>
              Patient Details
            </button>
            
            <button 
              class="nav-item ${state.activeSection === 'nurse-dashboard' ? 'active-nav' : ''}" 
              data-section="nurse-dashboard"
              style="display: flex; align-items: center; padding: 12px 20px; border: none; background: ${state.activeSection === 'nurse-dashboard' ? 'linear-gradient(to right, #007bff, #0056b3)' : 'transparent'}; color: ${state.activeSection === 'nurse-dashboard' ? 'white' : '#495057'}; text-align: left; font-size: 14px; font-weight: 500; border-radius: 0; position: relative; transition: all 0.3s; margin: 0 6px; border-radius: 8px;"
            >
              <span style="display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; margin-right: 12px; background: ${state.activeSection === 'nurse-dashboard' ? 'rgba(255, 255, 255, 0.2)' : '#e9ecef'}; border-radius: 6px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
              </span>
              Nurse Dashboard
            </button>
            
            <button 
              class="nav-item ${state.activeSection === 'doctor-dashboard' ? 'active-nav' : ''}" 
              data-section="doctor-dashboard"
              style="display: flex; align-items: center; padding: 12px 20px; border: none; background: ${state.activeSection === 'doctor-dashboard' ? 'linear-gradient(to right, #007bff, #0056b3)' : 'transparent'}; color: ${state.activeSection === 'doctor-dashboard' ? 'white' : '#495057'}; text-align: left; font-size: 14px; font-weight: 500; border-radius: 0; position: relative; transition: all 0.3s; margin: 0 6px; border-radius: 8px;"
            >
              <span style="display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; margin-right: 12px; background: ${state.activeSection === 'doctor-dashboard' ? 'rgba(255, 255, 255, 0.2)' : '#e9ecef'}; border-radius: 6px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
              </span>
              Doctor Dashboard
            </button>
            
            <button 
              class="nav-item ${state.activeSection === 'Reports' ? 'active-nav' : ''}" 
              data-section="Reports"
              style="display: flex; align-items: center; padding: 12px 20px; border: none; background: ${state.activeSection === 'Reports' ? 'linear-gradient(to right, #007bff, #0056b3)' : 'transparent'}; color: ${state.activeSection === 'Reports' ? 'white' : '#495057'}; text-align: left; font-size: 14px; font-weight: 500; border-radius: 0; position: relative; transition: all 0.3s; margin: 0 6px; border-radius: 8px;"
            >
              <span style="display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; margin-right: 12px; background: ${state.activeSection === 'Reports' ? 'rgba(255, 255, 255, 0.2)' : '#e9ecef'}; border-radius: 6px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              </span>
              Reports
            </button>
            
            <button 
              class="nav-item ${state.activeSection === 'billing' ? 'active-nav' : ''}" 
              data-section="billing"
              style="display: flex; align-items: center; padding: 12px 20px; border: none; background: ${state.activeSection === 'billing' ? 'linear-gradient(to right, #007bff, #0056b3)' : 'transparent'}; color: ${state.activeSection === 'billing' ? 'white' : '#495057'}; text-align: left; font-size: 14px; font-weight: 500; border-radius: 0; position: relative; transition: all 0.3s; margin: 0 6px; border-radius: 8px;"
            >
              <span style="display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; margin-right: 12px; background: ${state.activeSection === 'billing' ? 'rgba(255, 255, 255, 0.2)' : '#e9ecef'}; border-radius: 6px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
              </span>
              Billing
            </button>
          </div>
        </nav>
        
        <!-- Logout Button -->
        <div style="padding: 20px 15px; border-top: 1px solid #e9ecef;">
          <button id="logout-btn" style="width: 100%; padding: 10px; background: #f8f9fa; color: #dc3545; border: 1px solid #dc3545; border-radius: 6px; font-weight: 500; display: flex; align-items: center; justify-content: center; transition: all 0.3s;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            Logout
          </button>
        </div>
      </div>

      <div class="main-wrapper" style="margin-left: 250px; width: calc(100% - 250px);">
        <!-- No horizontal tabs anymore -->

        <!-- Main Content -->
        <main>
          <div class="main-content">
            ${renderActiveSection()}
          </div>
        </main>

        <!-- Footer -->
        <footer>
          <div class="container">
            &copy; 2025 PCB Hospital. All rights reserved. | Website created by Priti Bhandare.
          </div>
        </footer>
      </div>

      <!-- Modals -->
      ${state.modals.schedulePatient ? renderSchedulePatientModal() : ''}
      ${state.modals.findAppointment ? renderFindAppointmentModal() : ''}
      ${state.modals.addPatient ? renderAddPatientModal() : ''}
      ${state.modals.addBill ? renderAddBillModal() : ''}
      ${state.modals.addReport ? renderAddReportModal() : ''}
      ${state.modals.editAppointment ? renderEditAppointmentModal() : ''}
      ${state.modals.viewPatient ? renderViewPatientModal() : ''}
      ${state.modals.viewSchedule ? renderViewScheduleModal() : ''}
      ${state.modals.viewReport ? renderViewReportModal() : ''}
      ${state.modals.confirmDelete ? renderConfirmDeleteModal() : ''}
    </div>
  `;

  root.innerHTML = dashboard;

  // Add event listeners
  document.getElementById('logout-btn').addEventListener('click', handleLogout);
  
  // Add tab navigation listeners
  document.querySelectorAll('.nav-item').forEach(tab => {
    tab.addEventListener('click', () => {
      state.activeSection = tab.dataset.section;
      renderApp();
    });
  });

  // Add section-specific event listeners
  addSectionEventListeners();
}

// Render the active section based on state
function renderActiveSection() {
  switch (state.activeSection) {
    case 'appointment':
      return renderAppointmentsSection();
    case 'patient-details':
      return renderPatientsSection();
    case 'nurse-dashboard':
      return renderNurseSection();
    case 'doctor-dashboard':
      return renderDoctorSection();
    case 'Reports':
      return renderReportsSection();
    case 'billing':
      return renderBillingSection();
    default:
      return '';
  }
}

// Appointments Section
function renderAppointmentsSection() {
  return `
    <div>
      <div class="section-header">
        <h2 class="section-title">Appointments</h2>
        <div class="flex gap-3">
          <button id="schedule-patient-btn" class="btn btn-primary">
            Schedule New Patient
          </button>
          <button id="find-appointment-btn" class="btn btn-outline">
            Find Appointment
          </button>
        </div>
      </div>

      <div class="card">
        <div class="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Date</th>
                <th>Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${state.appointments.length === 0 ? 
                `<tr><td colspan="6" class="text-center">No appointments found</td></tr>` : 
                state.appointments.map((appt, index) => `
                  <tr>
                    <td>${appt.patientName}</td>
                    <td>${appt.doctorName}</td>
                    <td>${appt.department}</td>
                    <td>${appt.date}</td>
                    <td>${appt.time}</td>
                    <td>
                      <div class="action-buttons">
                        <button class="action-btn edit-appointment-btn" data-index="${index}">Edit</button>
                        <button class="action-btn cancel-appointment-btn" data-index="${index}">Cancel</button>
                      </div>
                    </td>
                  </tr>
                `).join('')
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// Patients Section
function renderPatientsSection() {
  return `
    <div>
      <div class="section-header">
        <h2 class="section-title">Patient Details</h2>
        <button id="add-patient-btn" class="btn btn-primary">
          Add New Patient
        </button>
      </div>

      <div class="card">
        <div class="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Problem</th>
                <th>Assigned Doctor</th>
                <th>Admit Date</th>
                <th>Discharge Date</th>
                <th>Assigned Room</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${state.patients.length === 0 ? 
                `<tr><td colspan="7" class="text-center">No patients found</td></tr>` : 
                state.patients.map((patient, index) => `
                  <tr>
                    <td>${patient.name}</td>
                    <td>${patient.problem}</td>
                    <td>${patient.doctorName}</td>
                    <td>${patient.admitDate}</td>
                    <td>${patient.dischargeDate}</td>
                    <td>${patient.assignedRoom}</td>
                    <td>
                      <div class="action-buttons">
                        <button class="action-btn view-patient-btn" data-index="${index}">View</button>
                        <button class="action-btn discharge-patient-btn" data-index="${index}">Discharge</button>
                      </div>
                    </td>
                  </tr>
                `).join('')
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// Nurse Section
function renderNurseSection() {
  return `
    <div>
      <h2 class="section-title mb-6">Nurse Dashboard</h2>

      <div class="card">
        <div class="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Shift Time</th>
                <th>Working Hours</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${state.nurses.length === 0 ? 
                `<tr><td colspan="4" class="text-center">No nurses found</td></tr>` : 
                state.nurses.map((nurse, index) => `
                  <tr>
                    <td>${nurse.name}</td>
                    <td>${nurse.shiftTime}</td>
                    <td>${nurse.workingHours}</td>
                    <td>
                      <div class="action-buttons">
                        <button class="action-btn view-schedule-btn" data-type="nurse" data-index="${index}">View Schedule</button>
                      </div>
                    </td>
                  </tr>
                `).join('')
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// Doctor Section
function renderDoctorSection() {
  return `
    <div>
      <h2 class="section-title mb-6">Doctor Dashboard</h2>

      <div class="card">
        <div class="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Experience</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${state.doctors.length === 0 ? 
                `<tr><td colspan="4" class="text-center">No doctors found</td></tr>` : 
                state.doctors.map((doctor, index) => `
                  <tr>
                    <td>${doctor.name}</td>
                    <td>${doctor.department}</td>
                    <td>${doctor.experience}</td>
                    <td>
                      <div class="action-buttons">
                        <button class="action-btn view-schedule-btn" data-type="doctor" data-index="${index}">View Schedule</button>
                      </div>
                    </td>
                  </tr>
                `).join('')
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// Reports Section
function renderReportsSection() {
  return `
    <div>
      <div class="section-header">
        <h2 class="section-title">Reports</h2>
        <button id="add-report-btn" class="btn btn-primary">
          Add New Report
        </button>
      </div>
      <p class="text-gray-600 mb-6">
        The hospital Reports section includes diagnostic tests, MRI, CT Scan, and advanced blood testing results.
      </p>

      <div class="card">
        <div class="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Status</th>
                <th>Test Name</th>
                <th>Test Report</th>
                <th>Report File</th>
              </tr>
            </thead>
            <tbody>
              ${state.reports.length === 0 ? 
                `<tr><td colspan="6" class="text-center">No reports found</td></tr>` : 
                state.reports.map((report, index) => `
                  <tr>
                    <td>${report.patientName}</td>
                    <td>${report.age}</td>
                    <td>
                      <span class="badge ${getStatusClass(report.status)}">
                        ${report.status}
                      </span>
                    </td>
                    <td>${report.testName}</td>
                    <td>${report.testReport}</td>
                    <td>
                      <button 
                        class="action-btn view-report-btn" 
                        data-index="${index}"
                        ${report.status === "Pending" ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}
                      >
                        View Report
                      </button>
                    </td>
                  </tr>
                `).join('')
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// Billing Section
function renderBillingSection() {
  return `
    <div>
      <div class="section-header">
        <h2 class="section-title">Billing</h2>
        <button id="add-bill-btn" class="btn btn-primary">
          Add New Bill
        </button>
      </div>

      <div class="card">
        <div class="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Amount</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${state.bills.length === 0 ? 
                `<tr><td colspan="6" class="text-center">No bills found</td></tr>` : 
                state.bills.map((bill, index) => `
                  <tr>
                    <td>${bill.patientName}</td>
                    <td>${bill.amount}</td>
                    <td>
                      <div>Dr.</div>
                      <div>${bill.doctorName.replace('Dr. ', '')}</div>
                    </td>
                    <td>${bill.department}</td>
                    <td>${bill.date}</td>
                    <td>
                      <div class="action-buttons">
                        <button class="action-btn print-bill-btn" data-index="${index}">Print</button>
                        <button class="action-btn delete-bill-btn" data-index="${index}">Delete</button>
                      </div>
                    </td>
                  </tr>
                `).join('')
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// Modal renderers
function renderSchedulePatientModal() {
  return `
    <div class="modal-backdrop">
      <div class="modal">
        <div class="modal-header">
          <h3 class="modal-title">Schedule New Patient</h3>
        </div>
        
        <form id="schedule-patient-form">
          <div class="form-group">
            <label class="form-label">Patient Name</label>
            <input type="text" class="form-control" name="patientName" required>
          </div>
          
          <div class="form-group">
            <label class="form-label">Doctor</label>
            <select class="form-control" name="doctorName" required>
              <option value="">Select a doctor</option>
              ${state.doctors.map(doctor => `
                <option value="${doctor.name}">${doctor.name} (${doctor.department})</option>
              `).join('')}
            </select>
          </div>
          
          <div class="form-group">
            <label class="form-label">Department</label>
            <select class="form-control" name="department" required>
              <option value="">Select a department</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Neurology">Neurology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="General Medicine">General Medicine</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Radiology">Radiology</option>
            </select>
          </div>
          
          <div class="form-group">
            <label class="form-label">Date</label>
            <input type="date" class="form-control" name="date" required>
          </div>
          
          <div class="form-group">
            <label class="form-label">Time</label>
            <input type="time" class="form-control" name="time" required>
          </div>
          
          <div class="modal-footer">
            <button type="button" class="btn btn-outline close-modal-btn">Cancel</button>
            <button type="submit" class="btn btn-primary">Schedule</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function renderAddReportModal() {
  return `
    <div class="modal-backdrop">
      <div class="modal">
        <div class="modal-header">
          <h3 class="modal-title">Add New Report</h3>
        </div>
        
        <form id="add-report-form">
          <div class="form-group">
            <label class="form-label">Patient Name</label>
            <input type="text" class="form-control" name="patientName" required>
          </div>
          
          <div class="form-group">
            <label class="form-label">Age</label>
            <input type="text" class="form-control" name="age" required>
          </div>
          
          <div class="form-group">
            <label class="form-label">Test Name</label>
            <select class="form-control" name="testName" required>
              <option value="">Select a test type</option>
              <option value="Blood Test">Blood Test</option>
              <option value="MRI Scan">MRI Scan</option>
              <option value="CT Scan">CT Scan</option>
              <option value="X-Ray">X-Ray</option>
              <option value="Ultrasound">Ultrasound</option>
            </select>
          </div>
          
          <div class="form-group">
            <label class="form-label">Test Results</label>
            <textarea class="form-control" name="testReport" rows="3" required></textarea>
          </div>
          
          <div class="form-group">
            <label class="form-label">Status</label>
            <select class="form-control" name="status" required>
              <option value="">Select status</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          
          <div class="modal-footer">
            <button type="button" class="btn btn-outline close-modal-btn">Cancel</button>
            <button type="submit" class="btn btn-primary">Add Report</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function renderEditAppointmentModal() {
  const appointment = state.selectedItem;
  
  return `
    <div class="modal-backdrop">
      <div class="modal">
        <div class="modal-header">
          <h3 class="modal-title">Edit Appointment</h3>
        </div>
        
        <form id="edit-appointment-form">
          <div class="form-group">
            <label class="form-label">Patient Name</label>
            <input type="text" class="form-control" name="patientName" value="${appointment.patientName}" required>
          </div>
          
          <div class="form-group">
            <label class="form-label">Doctor</label>
            <select class="form-control" name="doctorName" required>
              ${state.doctors.map(doctor => `
                <option value="${doctor.name}" ${doctor.name === appointment.doctorName ? 'selected' : ''}>
                  ${doctor.name} (${doctor.department})
                </option>
              `).join('')}
            </select>
          </div>
          
          <div class="form-group">
            <label class="form-label">Department</label>
            <select class="form-control" name="department" required>
              <option value="">Select a department</option>
              <option value="Cardiology" ${appointment.department === 'Cardiology' ? 'selected' : ''}>Cardiology</option>
              <option value="Neurology" ${appointment.department === 'Neurology' ? 'selected' : ''}>Neurology</option>
              <option value="Orthopedics" ${appointment.department === 'Orthopedics' ? 'selected' : ''}>Orthopedics</option>
              <option value="General Medicine" ${appointment.department === 'General Medicine' ? 'selected' : ''}>General Medicine</option>
              <option value="Dermatology" ${appointment.department === 'Dermatology' ? 'selected' : ''}>Dermatology</option>
              <option value="Radiology" ${appointment.department === 'Radiology' ? 'selected' : ''}>Radiology</option>
            </select>
          </div>
          
          <div class="form-group">
            <label class="form-label">Date</label>
            <input type="date" class="form-control" name="date" value="${appointment.date}" required>
          </div>
          
          <div class="form-group">
            <label class="form-label">Time</label>
            <input type="time" class="form-control" name="time" value="${appointment.time.replace(' AM', '').replace(' PM', '')}" required>
          </div>
          
          <div class="modal-footer">
            <button type="button" class="btn btn-outline close-modal-btn">Cancel</button>
            <button type="submit" class="btn btn-primary">Update Appointment</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function renderViewPatientModal() {
  const patient = state.selectedItem;
  
  return `
    <div class="modal-backdrop">
      <div class="modal">
        <div class="modal-header">
          <h3 class="modal-title">Patient Details</h3>
        </div>
        
        <div class="p-4">
          <div class="form-group">
            <label class="form-label">Patient Name</label>
            <div class="p-2 border rounded-md">${patient.name}</div>
          </div>
          
          <div class="form-group">
            <label class="form-label">Problem</label>
            <div class="p-2 border rounded-md">${patient.problem}</div>
          </div>
          
          <div class="form-group">
            <label class="form-label">Assigned Doctor</label>
            <div class="p-2 border rounded-md">${patient.doctorName}</div>
          </div>
          
          <div class="form-group">
            <label class="form-label">Admit Date</label>
            <div class="p-2 border rounded-md">${patient.admitDate}</div>
          </div>
          
          <div class="form-group">
            <label class="form-label">Discharge Date</label>
            <div class="p-2 border rounded-md">${patient.dischargeDate}</div>
          </div>
          
          <div class="form-group">
            <label class="form-label">Assigned Room</label>
            <div class="p-2 border rounded-md">${patient.assignedRoom}</div>
          </div>
          
          <div class="mt-6">
            <h4 class="text-md font-medium mb-2">Recent Appointments</h4>
            ${getPatientAppointments(patient.name).length === 0 ? 
              '<div class="text-gray-500 p-2">No recent appointments found</div>' : 
              `<ul class="border rounded-md p-2">
                ${getPatientAppointments(patient.name).map(appt => `
                  <li class="mb-2 pb-2 border-b last:border-b-0">
                    ${appt.date} at ${appt.time} with ${appt.doctorName}
                  </li>
                `).join('')}
              </ul>`
            }
          </div>
          
          <div class="modal-footer">
            <button type="button" class="btn btn-primary close-modal-btn">Close</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderViewScheduleModal() {
  const item = state.selectedItem;
  const type = state.selectedItemType;
  let title = '';
  let name = '';
  let appointments = [];
  
  if (type === 'doctor') {
    title = 'Doctor Schedule';
    name = item.name;
    appointments = getDoctorAppointments(name);
  } else if (type === 'nurse') {
    title = 'Nurse Schedule';
    name = item.name;
    appointments = [];
  }
  
  return `
    <div class="modal-backdrop">
      <div class="modal">
        <div class="modal-header">
          <h3 class="modal-title">${title}: ${name}</h3>
        </div>
        
        <div class="p-4">
          <h4 class="text-md font-medium mb-2">Upcoming Appointments</h4>
          
          ${appointments.length === 0 ? 
            '<div class="text-gray-500 p-2">No upcoming appointments found</div>' : 
            `<div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Department</th>
                  </tr>
                </thead>
                <tbody>
                  ${appointments.map(appt => `
                    <tr>
                      <td>${appt.patientName}</td>
                      <td>${appt.date}</td>
                      <td>${appt.time}</td>
                      <td>${appt.department}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>`
          }
          
          <div class="form-group mt-4">
            <label class="form-label">Working Hours</label>
            <div class="p-2 border rounded-md">
              ${type === 'doctor' ? '9:00 AM - 5:00 PM' : item.workingHours}
            </div>
          </div>
          
          <div class="modal-footer">
            <button type="button" class="btn btn-primary close-modal-btn">Close</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderViewReportModal() {
  const report = state.selectedItem;
  
  return `
    <div class="modal-backdrop">
      <div class="modal">
        <div class="modal-header">
          <h3 class="modal-title">Medical Report</h3>
        </div>
        
        <div class="p-4">
          <div class="flex justify-between items-center mb-4">
            <div>
              <h4 class="font-medium">${report.patientName}</h4>
              <div class="text-gray-500 text-sm">Age: ${report.age}</div>
            </div>
            <div>
              <span class="badge ${getStatusClass(report.status)}">${report.status}</span>
            </div>
          </div>
          
          <div class="form-group">
            <label class="form-label">Test Name</label>
            <div class="p-2 border rounded-md">${report.testName}</div>
          </div>
          
          <div class="form-group">
            <label class="form-label">Test Results</label>
            <div class="p-2 border rounded-md">${report.testReport}</div>
          </div>
          
          <div class="form-group">
            <label class="form-label">Doctor's Comments</label>
            <div class="p-2 border rounded-md">
              ${report.testName === 'Blood Test' ? 
                'Hemoglobin levels are normal. Patient is in good health.' : 
                'Test results pending. Will update once available.'}
            </div>
          </div>
          
          <div class="form-group">
            <label class="form-label">Report Date</label>
            <div class="p-2 border rounded-md">March 25, 2025</div>
          </div>
          
          <div class="modal-footer">
            <button type="button" class="btn btn-outline print-report-btn">Print Report</button>
            <button type="button" class="btn btn-primary close-modal-btn">Close</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderConfirmDeleteModal() {
  const item = state.selectedItem;
  const type = state.selectedItemType;
  let message = '';
  
  if (type === 'bill') {
    message = `Are you sure you want to delete the bill for ${item.patientName} for an amount of ${item.amount}?`;
  } else if (type === 'appointment') {
    message = `Are you sure you want to cancel the appointment for ${item.patientName} on ${item.date} at ${item.time}?`;
  }
  
  return `
    <div class="modal-backdrop">
      <div class="modal" style="max-width: 400px;">
        <div class="modal-header">
          <h3 class="modal-title">Confirm Action</h3>
        </div>
        
        <div class="p-4">
          <p class="mb-4">${message}</p>
          
          <div class="modal-footer">
            <button type="button" class="btn btn-outline close-modal-btn">Cancel</button>
            <button type="button" class="btn btn-primary confirm-delete-btn">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderFindAppointmentModal() {
  return `
    <div class="modal-backdrop">
      <div class="modal">
        <div class="modal-header">
          <h3 class="modal-title">Find Appointment</h3>
        </div>
        
        <form id="find-appointment-form">
          <div class="form-group">
            <label class="form-label">Patient Name</label>
            <input type="text" class="form-control" name="patientName">
          </div>
          
          <div class="form-group">
            <label class="form-label">Appointment Date (Optional)</label>
            <input type="date" class="form-control" name="date">
          </div>
          
          <div class="form-group">
            <label class="form-label">Doctor (Optional)</label>
            <select class="form-control" name="doctorName">
              <option value="">Any Doctor</option>
              ${state.doctors.map(doctor => `
                <option value="${doctor.name}">${doctor.name}</option>
              `).join('')}
            </select>
          </div>
          
          <div id="search-results" class="mt-6 hidden">
            <h4 class="font-medium text-gray-700 mb-2">Search Results:</h4>
            <div class="border rounded-md max-h-48 overflow-y-auto" id="results-container">
              <!-- Results will be inserted here -->
            </div>
          </div>
          
          <div class="modal-footer">
            <button type="button" class="btn btn-outline" id="reset-search-btn">Reset</button>
            <button type="button" class="btn btn-outline close-modal-btn">Close</button>
            <button type="submit" class="btn btn-primary">Search</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function renderAddPatientModal() {
  return `
    <div class="modal-backdrop">
      <div class="modal">
        <div class="modal-header">
          <h3 class="modal-title">Add New Patient</h3>
        </div>
        
        <form id="add-patient-form">
          <div class="form-group">
            <label class="form-label">Patient Name</label>
            <input type="text" class="form-control" name="name" required>
          </div>
          
          <div class="form-group">
            <label class="form-label">Problem</label>
            <input type="text" class="form-control" name="problem" required>
          </div>
          
          <div class="form-group">
            <label class="form-label">Doctor</label>
            <select class="form-control" name="doctorName" required>
              <option value="">Select a doctor</option>
              ${state.doctors.map(doctor => `
                <option value="${doctor.name}">${doctor.name} (${doctor.department})</option>
              `).join('')}
            </select>
          </div>
          
          <div class="form-group">
            <label class="form-label">Admit Date</label>
            <input type="date" class="form-control" name="admitDate" required>
          </div>
          
          <div class="form-group">
            <label class="form-label">Discharge Date (Estimated)</label>
            <input type="date" class="form-control" name="dischargeDate">
          </div>
          
          <div class="form-group">
            <label class="form-label">Assigned Room</label>
            <input type="text" class="form-control" name="assignedRoom" required>
          </div>
          
          <div class="modal-footer">
            <button type="button" class="btn btn-outline close-modal-btn">Cancel</button>
            <button type="submit" class="btn btn-primary">Add Patient</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function renderAddBillModal() {
  return `
    <div class="modal-backdrop">
      <div class="modal">
        <div class="modal-header">
          <h3 class="modal-title">Add New Bill</h3>
        </div>
        
        <form id="add-bill-form">
          <div class="form-group">
            <label class="form-label">Patient Name</label>
            <input type="text" class="form-control" name="patientName" required>
          </div>
          
          <div class="form-group">
            <label class="form-label">Amount (₹)</label>
            <input type="number" min="0" class="form-control" name="amount" required>
          </div>
          
          <div class="form-group">
            <label class="form-label">Doctor</label>
            <select class="form-control" name="doctorName" required>
              <option value="">Select a doctor</option>
              ${state.doctors.map(doctor => `
                <option value="${doctor.name}">${doctor.name}</option>
              `).join('')}
            </select>
          </div>
          
          <div class="form-group">
            <label class="form-label">Department</label>
            <select class="form-control" name="department" required>
              <option value="">Select a department</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Neurology">Neurology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="General Medicine">General Medicine</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Radiology">Radiology</option>
            </select>
          </div>
          
          <div class="form-group">
            <label class="form-label">Date</label>
            <input type="date" class="form-control" name="date" required>
          </div>
          
          <div class="modal-footer">
            <button type="button" class="btn btn-outline close-modal-btn">Cancel</button>
            <button type="submit" class="btn btn-primary">Add Bill</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

// Helper function to get status class
function getStatusClass(status) {
  switch (status) {
    case 'Completed':
      return 'bg-success';
    case 'Pending':
      return 'bg-warning';
    default:
      return 'bg-gray';
  }
}

// Helper function to get patient appointments
function getPatientAppointments(patientName) {
  return state.appointments.filter(appt => appt.patientName === patientName);
}

// Helper function to get doctor appointments
function getDoctorAppointments(doctorName) {
  return state.appointments.filter(appt => appt.doctorName === doctorName);
}

// Event listeners for section-specific buttons
function addSectionEventListeners() {
  // Appointment section buttons
  const schedulePatientBtn = document.getElementById('schedule-patient-btn');
  if (schedulePatientBtn) {
    schedulePatientBtn.addEventListener('click', () => {
      state.modals.schedulePatient = true;
      renderApp();
    });
  }
  
  const findAppointmentBtn = document.getElementById('find-appointment-btn');
  if (findAppointmentBtn) {
    findAppointmentBtn.addEventListener('click', () => {
      state.modals.findAppointment = true;
      renderApp();
    });
  }
  
  // Edit appointment buttons
  document.querySelectorAll('.edit-appointment-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = parseInt(btn.dataset.index);
      state.selectedItem = state.appointments[index];
      state.modals.editAppointment = true;
      renderApp();
    });
  });
  
  // Cancel appointment buttons
  document.querySelectorAll('.cancel-appointment-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = parseInt(btn.dataset.index);
      state.selectedItem = state.appointments[index];
      state.selectedItemType = 'appointment';
      state.modals.confirmDelete = true;
      renderApp();
    });
  });
  
  // Patient section buttons
  const addPatientBtn = document.getElementById('add-patient-btn');
  if (addPatientBtn) {
    addPatientBtn.addEventListener('click', () => {
      state.modals.addPatient = true;
      renderApp();
    });
  }
  
  // View patient buttons
  document.querySelectorAll('.view-patient-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = parseInt(btn.dataset.index);
      state.selectedItem = state.patients[index];
      state.modals.viewPatient = true;
      renderApp();
    });
  });
  
  // Discharge patient buttons
  document.querySelectorAll('.discharge-patient-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = parseInt(btn.dataset.index);
      const patient = state.patients[index];
      
      // Set discharge date to today
      const today = new Date();
      const todayFormatted = today.toISOString().split('T')[0];
      
      // Update patient
      patient.dischargeDate = todayFormatted;
      
      // Show success message
      alert(`Patient ${patient.name} has been marked as discharged on ${todayFormatted}`);
      
      // Re-render app
      renderApp();
    });
  });
  
  // View schedule buttons (for both doctors and nurses)
  document.querySelectorAll('.view-schedule-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = parseInt(btn.dataset.index);
      const type = btn.dataset.type;
      
      if (type === 'doctor') {
        state.selectedItem = state.doctors[index];
      } else if (type === 'nurse') {
        state.selectedItem = state.nurses[index];
      }
      
      state.selectedItemType = type;
      state.modals.viewSchedule = true;
      renderApp();
    });
  });
  
  // Reports section buttons
  const addReportBtn = document.getElementById('add-report-btn');
  if (addReportBtn) {
    addReportBtn.addEventListener('click', () => {
      state.modals.addReport = true;
      renderApp();
    });
  }
  
  // View report buttons
  document.querySelectorAll('.view-report-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = parseInt(btn.dataset.index);
      state.selectedItem = state.reports[index];
      
      // Only show if not pending
      if (state.selectedItem.status !== 'Pending') {
        state.modals.viewReport = true;
        renderApp();
      }
    });
  });
  
  // Billing section buttons
  const addBillBtn = document.getElementById('add-bill-btn');
  if (addBillBtn) {
    addBillBtn.addEventListener('click', () => {
      state.modals.addBill = true;
      renderApp();
    });
  }
  
  // Print bill buttons
  document.querySelectorAll('.print-bill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = parseInt(btn.dataset.index);
      const bill = state.bills[index];
      printBill(bill);
    });
  });
  
  // Delete bill buttons
  document.querySelectorAll('.delete-bill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = parseInt(btn.dataset.index);
      state.selectedItem = state.bills[index];
      state.selectedItemType = 'bill';
      state.modals.confirmDelete = true;
      renderApp();
    });
  });
  
  // Print report button (in modal)
  const printReportBtn = document.querySelector('.print-report-btn');
  if (printReportBtn) {
    printReportBtn.addEventListener('click', () => {
      printReport(state.selectedItem);
    });
  }
  
  // Confirm delete button (in modal)
  const confirmDeleteBtn = document.querySelector('.confirm-delete-btn');
  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener('click', () => {
      if (state.selectedItemType === 'bill') {
        // Find the bill index
        const index = state.bills.findIndex(bill => bill === state.selectedItem);
        if (index !== -1) {
          // Remove the bill
          state.bills.splice(index, 1);
          alert('Bill has been deleted successfully');
        }
      } else if (state.selectedItemType === 'appointment') {
        // Find the appointment index
        const index = state.appointments.findIndex(appt => appt === state.selectedItem);
        if (index !== -1) {
          // Remove the appointment
          state.appointments.splice(index, 1);
          alert('Appointment has been cancelled successfully');
        }
      }
      
      // Close the modal
      state.modals.confirmDelete = false;
      state.selectedItem = null;
      state.selectedItemType = null;
      
      // Re-render app
      renderApp();
    });
  }
  
  // Modal close buttons
  document.querySelectorAll('.close-modal-btn').forEach(btn => {
    btn.addEventListener('click', closeAllModals);
  });
  
  // Modal backdrop close
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', event => {
      if (event.target === backdrop) {
        closeAllModals();
      }
    });
  });
  
  // Reset search button in find appointment modal
  const resetSearchBtn = document.getElementById('reset-search-btn');
  if (resetSearchBtn) {
    resetSearchBtn.addEventListener('click', resetSearchForm);
  }
  
  // Setup form submissions
  setupFormSubmissions();
}

// Form submissions
function setupFormSubmissions() {
  // Schedule Patient Form
  const schedulePatientForm = document.getElementById('schedule-patient-form');
  if (schedulePatientForm) {
    schedulePatientForm.addEventListener('submit', handleSchedulePatient);
  }
  
  // Edit Appointment Form
  const editAppointmentForm = document.getElementById('edit-appointment-form');
  if (editAppointmentForm) {
    editAppointmentForm.addEventListener('submit', handleEditAppointment);
  }
  
  // Find Appointment Form
  const findAppointmentForm = document.getElementById('find-appointment-form');
  if (findAppointmentForm) {
    findAppointmentForm.addEventListener('submit', handleFindAppointment);
  }
  
  // Add Patient Form
  const addPatientForm = document.getElementById('add-patient-form');
  if (addPatientForm) {
    addPatientForm.addEventListener('submit', handleAddPatient);
  }
  
  // Add Report Form
  const addReportForm = document.getElementById('add-report-form');
  if (addReportForm) {
    addReportForm.addEventListener('submit', handleAddReport);
  }
  
  // Add Bill Form
  const addBillForm = document.getElementById('add-bill-form');
  if (addBillForm) {
    addBillForm.addEventListener('submit', handleAddBill);
  }
}

// Form handlers
function handleSchedulePatient(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  
  const appointment = {
    patientName: formData.get('patientName'),
    doctorName: formData.get('doctorName'),
    department: formData.get('department'),
    date: formData.get('date'),
    time: convertTo12HourFormat(formData.get('time'))
  };
  
  // Add to state
  state.appointments.push(appointment);
  
  // Close modal
  closeAllModals();
  
  // Re-render app
  renderApp();
}

function handleEditAppointment(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  
  // Find the appointment index
  const index = state.appointments.findIndex(appt => appt === state.selectedItem);
  
  if (index !== -1) {
    // Update appointment
    state.appointments[index] = {
      patientName: formData.get('patientName'),
      doctorName: formData.get('doctorName'),
      department: formData.get('department'),
      date: formData.get('date'),
      time: convertTo12HourFormat(formData.get('time'))
    };
    
    // Show success message
    alert('Appointment updated successfully');
  }
  
  // Close modal
  closeAllModals();
  
  // Re-render app
  renderApp();
}

function handleFindAppointment(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  
  const patientName = formData.get('patientName');
  const date = formData.get('date');
  const doctorName = formData.get('doctorName');
  
  // Filter appointments
  const filteredAppointments = state.appointments.filter(appt => {
    if (patientName && !appt.patientName.toLowerCase().includes(patientName.toLowerCase())) {
      return false;
    }
    
    if (date && appt.date !== date) {
      return false;
    }
    
    if (doctorName && appt.doctorName !== doctorName) {
      return false;
    }
    
    return true;
  });
  
  // Show results
  const searchResults = document.getElementById('search-results');
  const resultsContainer = document.getElementById('results-container');
  
  if (searchResults && resultsContainer) {
    searchResults.classList.remove('hidden');
    
    if (filteredAppointments.length === 0) {
      resultsContainer.innerHTML = `<div class="p-4 text-center text-gray-500">No appointments found matching the criteria.</div>`;
    } else {
      resultsContainer.innerHTML = filteredAppointments.map(appt => `
        <div class="p-3 border-b hover:bg-gray-50 last:border-b-0">
          <div class="font-medium">${appt.patientName}</div>
          <div class="text-sm text-gray-500">
            ${appt.date} at ${appt.time} with ${appt.doctorName}
          </div>
        </div>
      `).join('');
    }
  }
}

function handleAddPatient(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  
  const patient = {
    name: formData.get('name'),
    problem: formData.get('problem'),
    doctorName: formData.get('doctorName'),
    admitDate: formData.get('admitDate'),
    dischargeDate: formData.get('dischargeDate') || 'TBD',
    assignedRoom: formData.get('assignedRoom')
  };
  
  // Add to state
  state.patients.push(patient);
  
  // Close modal
  closeAllModals();
  
  // Re-render app
  renderApp();
}

function handleAddReport(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  
  const report = {
    patientName: formData.get('patientName'),
    age: formData.get('age'),
    status: formData.get('status'),
    testName: formData.get('testName'),
    testReport: formData.get('testReport')
  };
  
  // Add to state
  state.reports.push(report);
  
  // Close modal
  closeAllModals();
  
  // Re-render app
  renderApp();
  
  // Show success message
  alert('New report added successfully');
}

function handleAddBill(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  
  const bill = {
    patientName: formData.get('patientName'),
    amount: `₹${formData.get('amount')}`,
    doctorName: formData.get('doctorName'),
    department: formData.get('department'),
    date: formData.get('date')
  };
  
  // Add to state
  state.bills.push(bill);
  
  // Close modal
  closeAllModals();
  
  // Re-render app
  renderApp();
}

// Helper functions
function convertTo12HourFormat(time24) {
  if (!time24) return '';
  
  const [hours, minutes] = time24.split(':');
  let period = 'AM';
  let hours12 = parseInt(hours, 10);
  
  if (hours12 >= 12) {
    period = 'PM';
    if (hours12 > 12) {
      hours12 -= 12;
    }
  }
  
  if (hours12 === 0) {
    hours12 = 12;
  }
  
  return `${hours12}:${minutes} ${period}`;
}

function printBill(bill) {
  // Create a printable version of the bill
  const printWindow = window.open('', '_blank');
  
  if (printWindow) {
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>PCB Hospital - Invoice</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
          .invoice { max-width: 800px; margin: 0 auto; border: 1px solid #eee; padding: 20px; }
          .header { display: flex; justify-content: space-between; border-bottom: 1px solid #eee; padding-bottom: 20px; margin-bottom: 20px; }
          .logo { font-weight: bold; font-size: 24px; }
          .title { text-align: center; margin: 20px 0; font-size: 24px; }
          .details { margin-bottom: 20px; }
          .details div { margin-bottom: 5px; }
          .label { font-weight: bold; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th, td { padding: 10px; text-align: left; border-bottom: 1px solid #eee; }
          .total { text-align: right; font-weight: bold; font-size: 18px; margin-top: 20px; }
          .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="invoice">
          <div class="header">
            <div class="logo">PCB Hospital</div>
            <div>
              <div>Invoice #: INV-${Math.floor(Math.random() * 10000)}</div>
              <div>Date: ${bill.date}</div>
            </div>
          </div>
          
          <div class="title">INVOICE</div>
          
          <div class="details">
            <div><span class="label">Patient:</span> ${bill.patientName}</div>
            <div><span class="label">Doctor:</span> Dr. ${bill.doctorName.replace('Dr. ', '')}</div>
            <div><span class="label">Department:</span> ${bill.department}</div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Medical Consultation</td>
                <td>${bill.amount}</td>
              </tr>
              <tr>
                <td>Medical Tests</td>
                <td>₹1200</td>
              </tr>
              <tr>
                <td>Medication</td>
                <td>₹800</td>
              </tr>
            </tbody>
          </table>
          
          <div class="total">
            Total: ${bill.amount}
          </div>
          
          <div class="footer">
            Thank you for choosing PCB Hospital. We wish you a speedy recovery.
          </div>
        </div>
        <script>
          window.onload = function() {
            window.print();
          }
        </script>
      </body>
      </html>
    `);
    
    printWindow.document.close();
  } else {
    alert('Unable to open print window. Please check your browser settings and try again.');
  }
}

function printReport(report) {
  // Create a printable version of the report
  const printWindow = window.open('', '_blank');
  
  if (printWindow) {
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>PCB Hospital - Medical Report</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
          .report { max-width: 800px; margin: 0 auto; border: 1px solid #eee; padding: 20px; }
          .header { display: flex; justify-content: space-between; border-bottom: 1px solid #eee; padding-bottom: 20px; margin-bottom: 20px; }
          .logo { font-weight: bold; font-size: 24px; }
          .title { text-align: center; margin: 20px 0; font-size: 24px; }
          .patient-info { margin-bottom: 20px; }
          .patient-info div { margin-bottom: 5px; }
          .label { font-weight: bold; }
          .results { margin: 20px 0; padding: 15px; border: 1px solid #eee; border-radius: 5px; }
          .status { display: inline-block; padding: 5px 10px; border-radius: 15px; font-size: 12px; font-weight: bold; }
          .status.completed { background-color: #dcfce7; color: #166534; }
          .status.pending { background-color: #fef3c7; color: #92400e; }
          .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="report">
          <div class="header">
            <div class="logo">PCB Hospital</div>
            <div>
              <div>Report #: REP-${Math.floor(Math.random() * 10000)}</div>
              <div>Date: March 25, 2025</div>
            </div>
          </div>
          
          <div class="title">MEDICAL REPORT</div>
          
          <div class="patient-info">
            <div><span class="label">Patient Name:</span> ${report.patientName}</div>
            <div><span class="label">Age:</span> ${report.age}</div>
            <div><span class="label">Test Name:</span> ${report.testName}</div>
            <div><span class="label">Status:</span> <span class="status ${report.status.toLowerCase()}">${report.status}</span></div>
          </div>
          
          <div class="results">
            <div><span class="label">Test Results:</span></div>
            <p>${report.testReport}</p>
          </div>
          
          <div class="results">
            <div><span class="label">Doctor's Comments:</span></div>
            <p>${report.testName === 'Blood Test' ? 
              'Hemoglobin levels are normal. Patient is in good health.' : 
              'Test results pending. Will update once available.'}</p>
          </div>
          
          <div class="footer">
            This is a computer-generated report and does not require a signature.
          </div>
        </div>
        <script>
          window.onload = function() {
            window.print();
          }
        </script>
      </body>
      </html>
    `);
    
    printWindow.document.close();
  } else {
    alert('Unable to open print window. Please check your browser settings and try again.');
  }
}

// Reset search form
function resetSearchForm() {
  const form = document.getElementById('find-appointment-form');
  if (form) {
    form.reset();
  }
  
  const searchResults = document.getElementById('search-results');
  if (searchResults) {
    searchResults.classList.add('hidden');
  }
}

// Logout handler
function handleLogout() {
  state.isLoggedIn = false;
  state.username = '';
  state.activeSection = 'appointment';
  
  // Clear modals
  closeAllModals();
  
  // Re-render app
  renderApp();
}

// Close all modals
function closeAllModals() {
  Object.keys(state.modals).forEach(key => {
    state.modals[key] = false;
  });
  
  state.selectedItem = null;
  state.selectedItemType = null;
  
  renderApp();
}

// Data fetching functions
function fetchData() {
  // In a real app, these would be API calls
  fetchDoctors();
  fetchNurses();
  fetchPatients();
  fetchAppointments();
  fetchReports();
  fetchBills();
}

// Simulated API functions
function fetchDoctors() {
  state.doctors = [
    { name: "Dr. Nitin", department: "Radiology", experience: "Fresher" },
    { name: "Dr. Verma", department: "Cardiology", experience: "15 years" },
    { name: "Dr. Mehta", department: "Neurology", experience: "10 years" },
    { name: "Dr. Khanna", department: "Orthopedics", experience: "12 years" },
    { name: "Dr. Nisha", department: "General Medicine", experience: "8 years" },
    
  ];
}

function fetchNurses() {
  state.nurses = [
    { name: "Priya Sharma", shiftTime: "Day", workingHours: "8 AM - 4 PM" },
    { name: "Neha Patel", shiftTime: "Night", workingHours: "8 PM - 4 AM" },
    { name: "Anjali Gupta", shiftTime: "Evening", workingHours: "4 PM - 12 AM" },
  ];
}

function fetchPatients() {
  state.patients = [
    { 
      name: "Rahul Sharma", 
      problem: "Heart Issue", 
      doctorName: "Dr. Verma", 
      admitDate: "2025-02-15", 
      dischargeDate: "2025-02-25", 
      assignedRoom: "101" 
    },
    { 
      name: "Priya Mehta", 
      problem: "Brain Injury", 
      doctorName: "Dr. Mehta", 
      admitDate: "2025-03-01", 
      dischargeDate: "2025-03-15", 
      assignedRoom: "203" 
    },
  ];
}

function fetchAppointments() {
  state.appointments = [
    {
      patientName: "Amit Sharma",
      doctorName: "Dr. Verma",
      department: "Cardiology",
      date: "2025-03-25",
      time: "10:30 AM"
    },
    {
      patientName: "Neha Singh",
      doctorName: "Dr. Mehta",
      department: "Neurology",
      date: "2025-03-26",
      time: "2:15 PM"
    },
  ];
}

function fetchReports() {
  state.reports = [
    {
      patientName: "Rahul Sharma",
      age: "45",
      status: "Completed",
      testName: "Blood Test",
      testReport: "Hemoglobin: 14.2 g/dL"
    },
    {
      patientName: "Priya Mehta",
      age: "32",
      status: "Pending",
      testName: "MRI Scan",
      testReport: "Awaiting results"
    },
  ];
}

function fetchBills() {
  state.bills = [
    {
      patientName: "Rohan Das",
      amount: "₹5000",
      doctorName: "Verma",
      department: "Cardiology",
      date: "2025-03-20"
    },
    {
      patientName: "Neha Singh",
      amount: "₹8500",
      doctorName: "Mehta",
      department: "Neurology",
      date: "2025-03-15"
    },
  ];
}