/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller;

import bean.Reservation;
import bean.Salle;
import controller.util.PaginationHelper;
import java.util.Date;
import java.util.List;
import javax.faces.event.ActionEvent;
import javax.faces.model.DataModel;
import javax.faces.model.SelectItem;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;
import org.primefaces.event.ScheduleEntryMoveEvent;
import org.primefaces.event.ScheduleEntryResizeEvent;
import org.primefaces.event.SelectEvent;
import org.primefaces.model.ScheduleEvent;
import org.primefaces.model.ScheduleModel;

/**
 *
 * @author kamal
 */
public class ReservationControllerIT {
    
    public ReservationControllerIT() {
    }
    
    @BeforeClass
    public static void setUpClass() {
    }
    
    @AfterClass
    public static void tearDownClass() {
    }
    
    @Before
    public void setUp() {
    }
    
    @After
    public void tearDown() {
    }

    /**
     * Test of deletEvent method, of class ReservationController.
     */
    @Test
    public void testDeletEvent() {
        System.out.println("deletEvent");
        ActionEvent actionEvent = null;
        ReservationController instance = new ReservationController();
        instance.deletEvent(actionEvent);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of getUpdatedEvent method, of class ReservationController.
     */
    @Test
    public void testGetUpdatedEvent() {
        System.out.println("getUpdatedEvent");
        ReservationController instance = new ReservationController();
        ScheduleEvent expResult = null;
        ScheduleEvent result = instance.getUpdatedEvent();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of setUpdatedEvent method, of class ReservationController.
     */
    @Test
    public void testSetUpdatedEvent() {
        System.out.println("setUpdatedEvent");
        ScheduleEvent updatedEvent = null;
        ReservationController instance = new ReservationController();
        instance.setUpdatedEvent(updatedEvent);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of addEvent method, of class ReservationController.
     */
    @Test
    public void testAddEvent() {
        System.out.println("addEvent");
        ActionEvent actionEvent = null;
        ReservationController instance = new ReservationController();
        instance.addEvent(actionEvent);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of addDaysToPeridicite method, of class ReservationController.
     */
    @Test
    public void testAddDaysToPeridicite() {
        System.out.println("addDaysToPeridicite");
        String day = "";
        ReservationController instance = new ReservationController();
        instance.addDaysToPeridicite(day);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of addd method, of class ReservationController.
     */
    @Test
    public void testAddd() {
        System.out.println("addd");
        ReservationController instance = new ReservationController();
        instance.addd();
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of onEventSelect method, of class ReservationController.
     */
    @Test
    public void testOnEventSelect() {
        System.out.println("onEventSelect");
        SelectEvent selectEvent = null;
        ReservationController instance = new ReservationController();
        instance.onEventSelect(selectEvent);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of onDateSelect method, of class ReservationController.
     */
    @Test
    public void testOnDateSelect() {
        System.out.println("onDateSelect");
        SelectEvent selectEvent = null;
        ReservationController instance = new ReservationController();
        instance.onDateSelect(selectEvent);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of onEventMove method, of class ReservationController.
     */
    @Test
    public void testOnEventMove() {
        System.out.println("onEventMove");
        ScheduleEntryMoveEvent event = null;
        ReservationController instance = new ReservationController();
        instance.onEventMove(event);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of onEventResize method, of class ReservationController.
     */
    @Test
    public void testOnEventResize() {
        System.out.println("onEventResize");
        ScheduleEntryResizeEvent event = null;
        ReservationController instance = new ReservationController();
        instance.onEventResize(event);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of getCurrentSalle method, of class ReservationController.
     */
    @Test
    public void testGetCurrentSalle() {
        System.out.println("getCurrentSalle");
        ReservationController instance = new ReservationController();
        Salle expResult = null;
        Salle result = instance.getCurrentSalle();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of getDateDebut method, of class ReservationController.
     */
    @Test
    public void testGetDateDebut() {
        System.out.println("getDateDebut");
        ReservationController instance = new ReservationController();
        String expResult = "";
        String result = instance.getDateDebut();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of setDateDebut method, of class ReservationController.
     */
    @Test
    public void testSetDateDebut() {
        System.out.println("setDateDebut");
        String dateDebut = "";
        ReservationController instance = new ReservationController();
        instance.setDateDebut(dateDebut);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of getDateFin method, of class ReservationController.
     */
    @Test
    public void testGetDateFin() {
        System.out.println("getDateFin");
        ReservationController instance = new ReservationController();
        String expResult = "";
        String result = instance.getDateFin();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of setDateFin method, of class ReservationController.
     */
    @Test
    public void testSetDateFin() {
        System.out.println("setDateFin");
        String DateFin = "";
        ReservationController instance = new ReservationController();
        instance.setDateFin(DateFin);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of getTypeReservation method, of class ReservationController.
     */
    @Test
    public void testGetTypeReservation() {
        System.out.println("getTypeReservation");
        ReservationController instance = new ReservationController();
        String expResult = "";
        String result = instance.getTypeReservation();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of setTypeReservation method, of class ReservationController.
     */
    @Test
    public void testSetTypeReservation() {
        System.out.println("setTypeReservation");
        String typeReservation = "";
        ReservationController instance = new ReservationController();
        instance.setTypeReservation(typeReservation);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of setCurrentSalle method, of class ReservationController.
     */
    @Test
    public void testSetCurrentSalle() {
        System.out.println("setCurrentSalle");
        Salle currentSalle = null;
        ReservationController instance = new ReservationController();
        instance.setCurrentSalle(currentSalle);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of getSelected method, of class ReservationController.
     */
    @Test
    public void testGetSelected() {
        System.out.println("getSelected");
        ReservationController instance = new ReservationController();
        Reservation expResult = null;
        Reservation result = instance.getSelected();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of getPagination method, of class ReservationController.
     */
    @Test
    public void testGetPagination() {
        System.out.println("getPagination");
        ReservationController instance = new ReservationController();
        PaginationHelper expResult = null;
        PaginationHelper result = instance.getPagination();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of prepareList method, of class ReservationController.
     */
    @Test
    public void testPrepareList() {
        System.out.println("prepareList");
        ReservationController instance = new ReservationController();
        String expResult = "";
        String result = instance.prepareList();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of prepareView method, of class ReservationController.
     */
    @Test
    public void testPrepareView() {
        System.out.println("prepareView");
        ReservationController instance = new ReservationController();
        String expResult = "";
        String result = instance.prepareView();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of prepareCreate method, of class ReservationController.
     */
    @Test
    public void testPrepareCreate() {
        System.out.println("prepareCreate");
        ReservationController instance = new ReservationController();
        String expResult = "";
        String result = instance.prepareCreate();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of create method, of class ReservationController.
     */
    @Test
    public void testCreate() {
        System.out.println("create");
        ReservationController instance = new ReservationController();
        String expResult = "";
        String result = instance.create();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of dateConverter method, of class ReservationController.
     */
    @Test
    public void testDateConverter() {
        System.out.println("dateConverter");
        Date date1 = null;
        ReservationController instance = new ReservationController();
        String expResult = "";
        String result = instance.dateConverter(date1);
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of prepareEdit method, of class ReservationController.
     */
    @Test
    public void testPrepareEdit() {
        System.out.println("prepareEdit");
        ReservationController instance = new ReservationController();
        String expResult = "";
        String result = instance.prepareEdit();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of update method, of class ReservationController.
     */
    @Test
    public void testUpdate() {
        System.out.println("update");
        ReservationController instance = new ReservationController();
        String expResult = "";
        String result = instance.update();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of destroy method, of class ReservationController.
     */
    @Test
    public void testDestroy() {
        System.out.println("destroy");
        ReservationController instance = new ReservationController();
        String expResult = "";
        String result = instance.destroy();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of delete method, of class ReservationController.
     */
    @Test
    public void testDelete() {
        System.out.println("delete");
        ReservationController instance = new ReservationController();
        instance.delete();
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of annuler method, of class ReservationController.
     */
    @Test
    public void testAnnuler() {
        System.out.println("annuler");
        ReservationController instance = new ReservationController();
        instance.annuler();
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of destroyAndView method, of class ReservationController.
     */
    @Test
    public void testDestroyAndView() {
        System.out.println("destroyAndView");
        ReservationController instance = new ReservationController();
        String expResult = "";
        String result = instance.destroyAndView();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of getItems method, of class ReservationController.
     */
    @Test
    public void testGetItems() {
        System.out.println("getItems");
        ReservationController instance = new ReservationController();
        DataModel expResult = null;
        DataModel result = instance.getItems();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of next method, of class ReservationController.
     */
    @Test
    public void testNext() {
        System.out.println("next");
        ReservationController instance = new ReservationController();
        String expResult = "";
        String result = instance.next();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of previous method, of class ReservationController.
     */
    @Test
    public void testPrevious() {
        System.out.println("previous");
        ReservationController instance = new ReservationController();
        String expResult = "";
        String result = instance.previous();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of getItemsAvailableSelectMany method, of class ReservationController.
     */
    @Test
    public void testGetItemsAvailableSelectMany() {
        System.out.println("getItemsAvailableSelectMany");
        ReservationController instance = new ReservationController();
        SelectItem[] expResult = null;
        SelectItem[] result = instance.getItemsAvailableSelectMany();
        assertArrayEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of getItemsAvailableSelectOne method, of class ReservationController.
     */
    @Test
    public void testGetItemsAvailableSelectOne() {
        System.out.println("getItemsAvailableSelectOne");
        ReservationController instance = new ReservationController();
        SelectItem[] expResult = null;
        SelectItem[] result = instance.getItemsAvailableSelectOne();
        assertArrayEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of getReservation method, of class ReservationController.
     */
    @Test
    public void testGetReservation() {
        System.out.println("getReservation");
        Integer id = null;
        ReservationController instance = new ReservationController();
        Reservation expResult = null;
        Reservation result = instance.getReservation(id);
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of getReservations method, of class ReservationController.
     */
    @Test
    public void testGetReservations() {
        System.out.println("getReservations");
        ReservationController instance = new ReservationController();
        List<Reservation> expResult = null;
        List<Reservation> result = instance.getReservations();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of setReservations method, of class ReservationController.
     */
    @Test
    public void testSetReservations() {
        System.out.println("setReservations");
        List<Reservation> reservations = null;
        ReservationController instance = new ReservationController();
        instance.setReservations(reservations);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of init method, of class ReservationController.
     */
    @Test
    public void testInit() {
        System.out.println("init");
        ReservationController instance = new ReservationController();
        instance.init();
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of getRandomDate method, of class ReservationController.
     */
    @Test
    public void testGetRandomDate() {
        System.out.println("getRandomDate");
        Date base = null;
        ReservationController instance = new ReservationController();
        Date expResult = null;
        Date result = instance.getRandomDate(base);
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of getInitialDate method, of class ReservationController.
     */
    @Test
    public void testGetInitialDate() {
        System.out.println("getInitialDate");
        ReservationController instance = new ReservationController();
        Date expResult = null;
        Date result = instance.getInitialDate();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of getEventModel method, of class ReservationController.
     */
    @Test
    public void testGetEventModel() {
        System.out.println("getEventModel");
        ReservationController instance = new ReservationController();
        ScheduleModel expResult = null;
        ScheduleModel result = instance.getEventModel();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of getLazyEventModel method, of class ReservationController.
     */
    @Test
    public void testGetLazyEventModel() {
        System.out.println("getLazyEventModel");
        ReservationController instance = new ReservationController();
        ScheduleModel expResult = null;
        ScheduleModel result = instance.getLazyEventModel();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of getEvent method, of class ReservationController.
     */
    @Test
    public void testGetEvent() {
        System.out.println("getEvent");
        ReservationController instance = new ReservationController();
        ScheduleEvent expResult = null;
        ScheduleEvent result = instance.getEvent();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of setEvent method, of class ReservationController.
     */
    @Test
    public void testSetEvent() {
        System.out.println("setEvent");
        ScheduleEvent event = null;
        ReservationController instance = new ReservationController();
        instance.setEvent(event);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of redirect method, of class ReservationController.
     */
    @Test
    public void testRedirect() throws Exception {
        System.out.println("redirect");
        String page = "";
        ReservationController instance = new ReservationController();
        instance.redirect(page);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of goCalendar method, of class ReservationController.
     */
    @Test
    public void testGoCalendar() throws Exception {
        System.out.println("goCalendar");
        ReservationController instance = new ReservationController();
        instance.goCalendar();
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of dateDebutConverter method, of class ReservationController.
     */
    @Test
    public void testDateDebutConverter() {
        System.out.println("dateDebutConverter");
        ReservationController instance = new ReservationController();
        String expResult = "";
        String result = instance.dateDebutConverter();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of dateFinConverter method, of class ReservationController.
     */
    @Test
    public void testDateFinConverter() {
        System.out.println("dateFinConverter");
        ReservationController instance = new ReservationController();
        String expResult = "";
        String result = instance.dateFinConverter();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }
    
}
