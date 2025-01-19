describe('EngageSphere API - GET /customers', () => {
  const baseUrl = `${Cypress.env('API_URL')}/customers`

  it('should retrieve customers with default query parameters', () => {
    cy.request(baseUrl).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('customers');
      expect(response.body.customers).to.be.an('array');
      expect(response.body).to.have.property('pageInfo');
      expect(response.body.pageInfo).to.have.property('currentPage', 1);
      expect(response.body.pageInfo).to.have.property('totalPages');
      expect(response.body.pageInfo).to.have.property('totalCustomers');
    });
  });

  it('should have the correct response structure', () => {
    cy.request(baseUrl).then((response) => {
      expect(response.status).to.eq(200);
      response.body.customers.forEach((customer) => {
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
    }).then((response) => {
      expect(response.status).to.eq(400);
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
    }).then((response) => {
      expect(response.status).to.eq(400);
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
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });
});
