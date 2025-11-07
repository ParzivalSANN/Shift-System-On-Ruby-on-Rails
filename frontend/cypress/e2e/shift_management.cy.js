describe('Vardiya Yönetimi', () => {

  afterEach(() => {
    // cy.saveHar();
  });

  it('mevcut vardiyaları göstermeli', () => {
    const vardiyalar = [
      { id: 1, employee_name: 'Ayşe', start_time: '2025-12-01T09:00:00.000Z', end_time: '2025-12-01T17:00:00.000Z' },
      { id: 2, employee_name: 'Mehmet', start_time: '2025-12-02T09:00:00.000Z', end_time: '2025-12-02T17:00:00.000Z' },
    ];
    cy.intercept('GET', '/shifts', { body: vardiyalar }).as('getShifts');
    cy.visit('http://localhost:5173');
    cy.wait('@getShifts');
    cy.wait(1000);

    cy.contains('li', `Ayşe - ${new Date(vardiyalar[0].start_time).toLocaleString()} - ${new Date(vardiyalar[0].end_time).toLocaleString()}`);
    cy.wait(500);
    cy.contains('li', `Mehmet - ${new Date(vardiyalar[1].start_time).toLocaleString()} - ${new Date(vardiyalar[1].end_time).toLocaleString()}`);
  });

  it('kullanıcı yeni vardiya oluşturabilmeli', () => {
    const calisanAdi = 'Ahmet Yılmaz';
    const baslangicZamani = '2025-12-01T09:00';
    const bitisZamani = '2025-12-01T17:00';

    cy.intercept('GET', '/shifts', []).as('getShifts');
    cy.visit('http://localhost:5173');
    cy.wait('@getShifts');
    cy.wait(1000);

    cy.get('input[name="start_time"]').type(baslangicZamani);
    cy.wait(500);
    cy.get('input[name="end_time"]').type(bitisZamani);
    cy.wait(500);
    cy.get('input[name="employee_name"]').type(calisanAdi);
    cy.wait(500);

    cy.intercept('POST', '/shifts').as('createShift');
    cy.intercept('GET', '/shifts', {
      body: [
        {
          id: 1,
          start_time: new Date(baslangicZamani).toISOString(),
          end_time: new Date(bitisZamani).toISOString(),
          employee_name: calisanAdi,
        },
      ],
    }).as('getShiftsAfterCreate');

    cy.get('button[type="submit"]').click();
    cy.wait(500);

    cy.wait('@createShift');
    cy.wait('@getShiftsAfterCreate');
    cy.wait(1000);

    cy.contains('li', `${calisanAdi} - ${new Date(baslangicZamani).toLocaleString()} - ${new Date(bitisZamani).toLocaleString()}`);
  });

  it('kullanıcı vardiya güncelleyebilmeli', () => {
    const ilkVardiya = { 
      id: 1, 
      employee_name: 'Zeynep', 
      start_time: '2025-12-03T10:00:00.000Z', 
      end_time: '2025-12-03T18:00:00.000Z' 
    };
    
    cy.intercept('GET', '/shifts', { body: [ilkVardiya] }).as('getShifts');
    cy.visit('http://localhost:5173');
    cy.wait('@getShifts');
    cy.wait(1000);

    cy.contains('li', 'Zeynep').within(() => {
      cy.contains('button', 'Düzenle').click();
    });
    cy.wait(1000);

    const guncelCalisanAdi = 'Zeynep Kaya';
    const guncelBaslangicZamani = '2025-12-03T11:00';
    const guncelBitisZamani = '2025-12-03T19:00';

    cy.get('input[name="employee_name"]')
      .should('be.visible')
      .clear()
      .type(guncelCalisanAdi);
    cy.wait(500);
      
    cy.get('input[name="start_time"]')
      .should('be.visible')
      .invoke('val', guncelBaslangicZamani);
    cy.wait(500);
      
    cy.get('input[name="end_time"]')
      .should('be.visible')
      .invoke('val', guncelBitisZamani);
    cy.wait(500);
    
    const guncelVardiya = { 
      id: 1, 
      employee_name: guncelCalisanAdi, 
      start_time: new Date(guncelBaslangicZamani).toISOString(), 
      end_time: new Date(guncelBitisZamani).toISOString() 
    };

    cy.intercept('PUT', '/shifts/1', { body: guncelVardiya }).as('updateShift');
    cy.intercept('GET', '/shifts', { body: [guncelVardiya] }).as('getShiftsAfterUpdate');

    cy.get('button[type="submit"]').click();
    cy.wait(500);

    cy.wait('@updateShift');
    cy.wait('@getShiftsAfterUpdate');
    cy.wait(1000);

    cy.contains('li', guncelCalisanAdi).should('be.visible');
  });

  it('kullanıcı vardiya silebilmeli', () => {
    const vardiya = { 
      id: 1, 
      employee_name: 'Can', 
      start_time: '2025-12-04T08:00:00.000Z', 
      end_time: '2025-12-04T16:00:00.000Z' 
    };

    cy.intercept('GET', '/shifts', { body: [vardiya] }).as('getShifts');
    cy.visit('http://localhost:5173');
    cy.wait('@getShifts');
    cy.wait(1000);

    cy.intercept('DELETE', '/shifts/1', { statusCode: 200 }).as('deleteShift');
    cy.intercept('GET', '/shifts', { body: [] }).as('getShiftsAfterDelete');

    cy.contains('li', 'Can').within(() => {
      cy.contains('button', 'Sil').click();
    });
    cy.wait(500);

    cy.wait('@deleteShift');
    cy.wait('@getShiftsAfterDelete');
    cy.wait(1000);

    cy.contains('li', 'Can').should('not.exist');
  });
});