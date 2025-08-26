class CandidateDetailsPanel {
  // Elementos del panel
  elements = {
    panel: () => cy.get('[data-testid="candidate-details-panel"]'),
    title: () => cy.get('[data-testid="candidate-details-title"]'),
    closeBtn: () => cy.get('[data-testid="close-panel-btn"]'),
    
    // Información personal
    candidateName: () => cy.get('[data-testid="candidate-name"]'),
    candidateEmail: () => cy.get('[data-testid="candidate-email"]'),
    candidatePhone: () => cy.get('[data-testid="candidate-phone"]'),
    candidateAddress: () => cy.get('[data-testid="candidate-address"]'),
    
    // Educación
    educationSection: () => cy.get('[data-testid="education-section"]'),
    educationItems: () => cy.get('[data-testid="education-item"]'),
    educationInstitution: (index) => cy.get(`[data-testid="education-item-${index}"] [data-testid="institution"]`),
    educationTitle: (index) => cy.get(`[data-testid="education-item-${index}"] [data-testid="title"]`),
    educationDates: (index) => cy.get(`[data-testid="education-item-${index}"] [data-testid="dates"]`),
    
    // Experiencia laboral
    workExperienceSection: () => cy.get('[data-testid="work-experience-section"]'),
    workExperienceItems: () => cy.get('[data-testid="work-experience-item"]'),
    workCompany: (index) => cy.get(`[data-testid="work-experience-item-${index}"] [data-testid="company"]`),
    workPosition: (index) => cy.get(`[data-testid="work-experience-item-${index}"] [data-testid="position"]`),
    workDescription: (index) => cy.get(`[data-testid="work-experience-item-${index}"] [data-testid="description"]`),
    workDates: (index) => cy.get(`[data-testid="work-experience-item-${index}"] [data-testid="dates"]`),
    
    // CVs
    cvSection: () => cy.get('[data-testid="cv-section"]'),
    cvLinks: () => cy.get('[data-testid="cv-link"]'),
    cvDownloadLink: (index) => cy.get(`[data-testid="cv-link-${index}"]`),
    
    // Solicitudes
    applicationsSection: () => cy.get('[data-testid="applications-section"]'),
    applicationItems: () => cy.get('[data-testid="application-item"]'),
    applicationPosition: (index) => cy.get(`[data-testid="application-item-${index}"] [data-testid="position"]`),
    applicationDate: (index) => cy.get(`[data-testid="application-item-${index}"] [data-testid="date"]`),
    
    // Entrevistas
    interviewsSection: (appIndex) => cy.get(`[data-testid="application-item-${appIndex}"] [data-testid="interviews-section"]`),
    interviewItems: (appIndex) => cy.get(`[data-testid="application-item-${appIndex}"] [data-testid="interview-item"]`),
    interviewDate: (appIndex, interviewIndex) => cy.get(`[data-testid="application-item-${appIndex}"] [data-testid="interview-item-${interviewIndex}"] [data-testid="date"]`),
    interviewStage: (appIndex, interviewIndex) => cy.get(`[data-testid="application-item-${appIndex}"] [data-testid="interview-item-${interviewIndex}"] [data-testid="stage"]`),
    interviewNotes: (appIndex, interviewIndex) => cy.get(`[data-testid="application-item-${appIndex}"] [data-testid="interview-item-${interviewIndex}"] [data-testid="notes"]`),
    interviewScore: (appIndex, interviewIndex) => cy.get(`[data-testid="application-item-${appIndex}"] [data-testid="interview-item-${interviewIndex}"] [data-testid="score"]`),
    
    // Formulario de nueva entrevista
    newInterviewSection: () => cy.get('[data-testid="new-interview-section"]'),
    interviewNotesInput: () => cy.get('[data-testid="interview-notes-input"]'),
    starRating: (rating) => cy.get(`[data-testid="star-rating-${rating}"]`),
    saveInterviewBtn: () => cy.get('[data-testid="save-interview-btn"]'),
    
    // Estados de carga y error
    loadingSpinner: () => cy.get('[data-testid="loading-spinner"]'),
    errorMessage: () => cy.get('[data-testid="error-message"]'),
    successMessage: () => cy.get('[data-testid="success-message"]')
  }

  // Métodos de apertura y cierre
  shouldBeVisible() {
    this.elements.panel().should('be.visible')
  }

  shouldBeHidden() {
    this.elements.panel().should('not.exist')
  }

  close() {
    this.elements.closeBtn().click()
    this.shouldBeHidden()
  }

  // Métodos de validación de información personal
  shouldShowCandidateName(name) {
    this.elements.candidateName().should('contain', name)
  }

  shouldShowCandidateEmail(email) {
    this.elements.candidateEmail().should('contain', email)
  }

  shouldShowCandidatePhone(phone) {
    this.elements.candidatePhone().should('contain', phone)
  }

  shouldShowCandidateAddress(address) {
    this.elements.candidateAddress().should('contain', address)
  }

  // Métodos de validación de educación
  shouldShowEducationSection() {
    this.elements.educationSection().should('be.visible')
  }

  shouldShowEducationItems(count) {
    this.elements.educationItems().should('have.length', count)
  }

  shouldShowEducationData(index, expectedData) {
    if (expectedData.institution) {
      this.elements.educationInstitution(index).should('contain', expectedData.institution)
    }
    
    if (expectedData.title) {
      this.elements.educationTitle(index).should('contain', expectedData.title)
    }
    
    if (expectedData.dates) {
      this.elements.educationDates(index).should('contain', expectedData.dates)
    }
  }

  // Métodos de validación de experiencia laboral
  shouldShowWorkExperienceSection() {
    this.elements.workExperienceSection().should('be.visible')
  }

  shouldShowWorkExperienceItems(count) {
    this.elements.workExperienceItems().should('have.length', count)
  }

  shouldShowWorkExperienceData(index, expectedData) {
    if (expectedData.company) {
      this.elements.workCompany(index).should('contain', expectedData.company)
    }
    
    if (expectedData.position) {
      this.elements.workPosition(index).should('contain', expectedData.position)
    }
    
    if (expectedData.description) {
      this.elements.workDescription(index).should('contain', expectedData.description)
    }
    
    if (expectedData.dates) {
      this.elements.workDates(index).should('contain', expectedData.dates)
    }
  }

  // Métodos de validación de CVs
  shouldShowCVSection() {
    this.elements.cvSection().should('be.visible')
  }

  shouldShowCVLinks(count) {
    this.elements.cvLinks().should('have.length', count)
  }

  shouldHaveDownloadableCV(index) {
    this.elements.cvDownloadLink(index).should('have.attr', 'href')
    this.elements.cvDownloadLink(index).should('have.attr', 'target', '_blank')
  }

  // Métodos de validación de solicitudes
  shouldShowApplicationsSection() {
    this.elements.applicationsSection().should('be.visible')
  }

  shouldShowApplicationItems(count) {
    this.elements.applicationItems().should('have.length', count)
  }

  shouldShowApplicationData(index, expectedData) {
    if (expectedData.position) {
      this.elements.applicationPosition(index).should('contain', expectedData.position)
    }
    
    if (expectedData.date) {
      this.elements.applicationDate(index).should('contain', expectedData.date)
    }
  }

  // Métodos de validación de entrevistas
  shouldShowInterviewsSection(appIndex) {
    this.elements.interviewsSection(appIndex).should('be.visible')
  }

  shouldShowInterviewItems(appIndex, count) {
    this.elements.interviewItems(appIndex).should('have.length', count)
  }

  shouldShowInterviewData(appIndex, interviewIndex, expectedData) {
    if (expectedData.date) {
      this.elements.interviewDate(appIndex, interviewIndex).should('contain', expectedData.date)
    }
    
    if (expectedData.stage) {
      this.elements.interviewStage(appIndex, interviewIndex).should('contain', expectedData.stage)
    }
    
    if (expectedData.notes) {
      this.elements.interviewNotes(appIndex, interviewIndex).should('contain', expectedData.notes)
    }
    
    if (expectedData.score !== undefined) {
      this.elements.interviewScore(appIndex, interviewIndex).should('contain', expectedData.score)
    }
  }

  // Métodos de formulario de nueva entrevista
  shouldShowNewInterviewSection() {
    this.elements.newInterviewSection().should('be.visible')
  }

  fillInterviewNotes(notes) {
    this.elements.interviewNotesInput().clear().type(notes)
  }

  selectStarRating(rating) {
    this.elements.starRating(rating).click()
  }

  saveInterview() {
    this.elements.saveInterviewBtn().click()
  }

  // Métodos de validación de formulario
  shouldShowInterviewNotesInput() {
    this.elements.interviewNotesInput().should('be.visible')
  }

  shouldShowStarRating() {
    this.elements.starRating(1).should('be.visible')
    this.elements.starRating(5).should('be.visible')
  }

  shouldShowSaveButton() {
    this.elements.saveInterviewBtn().should('be.visible')
  }

  // Métodos de validación de estados
  shouldShowLoadingState() {
    this.elements.loadingSpinner().should('be.visible')
  }

  shouldHideLoadingState() {
    this.elements.loadingSpinner().should('not.exist')
  }

  shouldShowSuccessMessage(message) {
    this.elements.successMessage().should('contain', message)
  }

  shouldShowErrorMessage(message) {
    this.elements.errorMessage().should('contain', message)
  }

  shouldHaveNoErrors() {
    this.elements.errorMessage().should('not.exist')
  }

  // Métodos de validación de datos completos
  validateCandidateDetails(expectedData) {
    if (expectedData.personal) {
      this.shouldShowCandidateName(expectedData.personal.name)
      this.shouldShowCandidateEmail(expectedData.personal.email)
      if (expectedData.personal.phone) {
        this.shouldShowCandidatePhone(expectedData.personal.phone)
      }
      if (expectedData.personal.address) {
        this.shouldShowCandidateAddress(expectedData.personal.address)
      }
    }
    
    if (expectedData.education) {
      this.shouldShowEducationSection()
      this.shouldShowEducationItems(expectedData.education.length)
      expectedData.education.forEach((edu, index) => {
        this.shouldShowEducationData(index, edu)
      })
    }
    
    if (expectedData.workExperience) {
      this.shouldShowWorkExperienceSection()
      this.shouldShowWorkExperienceItems(expectedData.workExperience.length)
      expectedData.workExperience.forEach((work, index) => {
        this.shouldShowWorkExperienceData(index, work)
      })
    }
    
    if (expectedData.cvs) {
      this.shouldShowCVSection()
      this.shouldShowCVLinks(expectedData.cvs.length)
      expectedData.cvs.forEach((_, index) => {
        this.shouldHaveDownloadableCV(index)
      })
    }
  }

  // Métodos de interacción completa
  registerNewInterview(interviewData) {
    this.shouldShowNewInterviewSection()
    
    if (interviewData.notes) {
      this.fillInterviewNotes(interviewData.notes)
    }
    
    if (interviewData.rating) {
      this.selectStarRating(interviewData.rating)
    }
    
    this.saveInterview()
  }
}

export default new CandidateDetailsPanel()
