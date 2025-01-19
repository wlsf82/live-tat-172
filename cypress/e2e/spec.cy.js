describe('EngageSphere API - GET /customers', () => {
  const baseUrl = `${Cypress.env('API_URL')}/customers`

  it('should retrieve customers with default query parameters', () => {
    cy.request(baseUrl).then(({ status, body }) => {
      expect(status).to.eq(200);
      expect(body).to.have.property('customers');
      expect(body.customers).to.be.an('array');
      expect(body).to.have.property('pageInfo');
      expect(body.pageInfo).to.have.property('currentPage', 1);
      expect(body.pageInfo).to.have.property('totalPages');
      expect(body.pageInfo).to.have.property('totalCustomers');
    });
  });

  it('should have the correct response structure', () => {
    cy.request(baseUrl).then(({ status, body }) => {
      expect(status).to.eq(200);
      body.customers.forEach((customer) => {
        expect(customer).to.have.property('id');
        expect(customer).to.have.property('name');
        expect(customer).to.have.property('employees');
        expect(customer).to.have.property('contactInfo');
        if (customer.contactInfo) {
          expect(customer.contactInfo).to.have.property('name');
          expect(customer.contactInfo).to.have.property('email');
        }
        expect(customer).to.have.property('size');
        expect(customer).to.have.property('industry');
        expect(customer).to.have.property('address');
        if (customer.address) {
          expect(customer.address).to.have.property('street');
          expect(customer.address).to.have.property('city');
          expect(customer.address).to.have.property('state');
          expect(customer.address).to.have.property('zipCode');
          expect(customer.address).to.have.property('country');
        }
      });
    });
  });

  it('should return 400 Bad Request for invalid page parameter', () => {
    cy.request({
      method: 'GET',
      url: baseUrl,
      qs: {
        page: -1
      },
      failOnStatusCode: false
    }).then(({ status }) => {
      expect(status).to.eq(400);
    });
  });

  it('should return 400 Bad Request for invalid limit parameter', () => {
    cy.request({
      method: 'GET',
      url: baseUrl,
      qs: {
        limit: 0
      },
      failOnStatusCode: false
    }).then(({ status }) => {
      expect(status).to.eq(400);
    });
  });

  it('should return 400 Bad Request for invalid size parameter', () => {
    cy.request({
      method: 'GET',
      url: baseUrl,
      qs: {
        size: 'InvalidSize'
      },
      failOnStatusCode: false
    }).then(({ status }) => {
      expect(status).to.eq(400);
    });
  });

  it('should return 400 Bad Request for invalid industry parameter', () => {
    cy.request({
      method: 'GET',
      url: baseUrl,
      qs: {
        industry: 'InvalidIndustry'
      },
      failOnStatusCode: false
    }).then(({ status }) => {
      expect(status).to.eq(400);
    });
  });
});
