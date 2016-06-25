package controller;

import bean.Module;
import bean.Reservation;
import bean.Reservation.ReservationType;
import bean.Salle;
import controller.util.JsfUtil;
import controller.util.PaginationHelper;
import dao.ModuleFacade;
import dao.ReservationFacade;
import java.io.IOException;

import java.io.Serializable;
import java.util.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.ResourceBundle;
import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.inject.Named;
import javax.enterprise.context.SessionScoped;
import javax.faces.application.FacesMessage;
import javax.faces.component.UIComponent;
import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;
import javax.faces.convert.Converter;
import javax.faces.convert.FacesConverter;
import javax.faces.event.ActionEvent;
import javax.faces.model.DataModel;
import javax.faces.model.ListDataModel;
import javax.faces.model.SelectItem;
import org.primefaces.event.ScheduleEntryMoveEvent;
import org.primefaces.event.ScheduleEntryResizeEvent;
import org.primefaces.event.SelectEvent;
import org.primefaces.model.DefaultScheduleEvent;
import org.primefaces.model.DefaultScheduleModel;
import org.primefaces.model.LazyScheduleModel;
import org.primefaces.model.ScheduleEvent;
import org.primefaces.model.ScheduleModel;
//import

@Named("reservationController")
@SessionScoped
public class ReservationController implements Serializable {

    private Reservation current;
    private DataModel items = null;
    private Salle currentSalle;
    private String typeReservation;
    private String dateDebut;
    private String dateFin;
    private boolean isPeriodicite;

    // calnedar 
    private ScheduleModel eventModel;

    private ScheduleModel lazyEventModel;

    private ScheduleEvent event = new DefaultScheduleEvent();
    private ScheduleEvent updatedEvent = new DefaultScheduleEvent();

    List<Reservation> reservations = null;
    private ArrayList<String> days = new ArrayList<>();
    @EJB
    ModuleFacade moduleFacade;
    @EJB
    private dao.ReservationFacade ejbFacade;
    private PaginationHelper pagination;
    private int selectedItemIndex;

    // calendar events 
    public void deletEvent(ActionEvent actionEvent) {
        delete();
    }

    public ScheduleEvent getUpdatedEvent() {
        return updatedEvent;
    }

    public void setUpdatedEvent(ScheduleEvent updatedEvent) {
        this.updatedEvent = updatedEvent;
    }

    public void addEvent(ActionEvent actionEvent) {
        System.out.println("controller.ReservationController.addEvent() 1");
        if (event.getId() == null) {
            System.out.println("controller.ReservationController.addEvent() 2");
            eventModel.addEvent(event);
            try {
                System.out.println("controller.ReservationController.addEvent() 3");
                current.setEndDate(event.getEndDate());
                current.setStartDate(event.getStartDate());
                current.setType(ReservationType.valueOf(typeReservation));
                current.setDescription(event.getTitle());
                current.getSalle().add(currentSalle);
                String fullTitle = event.getTitle() + "</br>" + " salle : " + current.getSalle().get(0).getNumero()
                        + "</br> departement : " + current.getSalle().get(0).getDepartement().getNom()
                        + "</br> pour un " + current.getType();

                getFacade().create(current);
                reservations.add(current);
                init();
            } catch (Exception e) {
                JsfUtil.addErrorMessage(e, ResourceBundle.getBundle("/Bundle").getString("PersistenceErrorOccured"));

            }

        } else { // update event and reservation on the DB
            Reservation updatedOn = new Reservation();
            updatedOn = (Reservation) event.getData();
//            current.setId(updatedOn.getId());
            current.setEndDate(event.getEndDate());
            current.setStartDate(event.getStartDate());
            current.setType(ReservationType.valueOf(typeReservation));
            current.setDescription(event.getTitle());
            current.getSalle().clear();
            current.getSalle().add(currentSalle);
            try {
                getFacade().edit(current);
                eventModel.updateEvent(event);
            } catch (Exception e) {
                System.out.println(e.toString());
            }

        }

        event = new DefaultScheduleEvent();
    }
    //ajax methode 

    public void addDaysToPeridicite(String day) {
        String currendtDays = current.getPeriodiciteDays() + "n";
        if (!currendtDays.contains(day)) {
            current.setPeriodiciteDays(current.getPeriodiciteDays() + "," + day);
            System.out.println("dddddddddddddddddyyyyyyyyy " + day);
        }
    }

    public void checkSalleavailability() {
        int formationNbrEtudiants=0;
        for (Module m : moduleFacade.findAll()) {
            if (m.getId() == current.getId()) {
                formationNbrEtudiants = m.getFormation().getNombreEtudiants();
            }
            if (formationNbrEtudiants > currentSalle.getNbr_place()) {
                FacesMessage message = new FacesMessage(FacesMessage.SEVERITY_ERROR, "erreur", "le nombre d'etudiants est supérieur au nombre de places !!");
                addMessage(message);
            }
        }
    }

    public void createReservationPeriodicite(Reservation reservation) {
        eventModel.addEvent(event);
    }

    public void chekPeriodicite() {
    }

    public void addd() {
        System.out.println("controller.ReservationController.addEvent() 2");
        eventModel.addEvent(event);
        try {
            System.out.println("controller.ReservationController.addEvent() 3");
            current.setEndDate(event.getEndDate());
            current.setStartDate(event.getStartDate());
            current.setType(ReservationType.valueOf(typeReservation));
            current.getSalle().add(currentSalle);
            getFacade().create(current);
        } catch (Exception e) {
            JsfUtil.addErrorMessage(e, ResourceBundle.getBundle("/Bundle").getString("PersistenceErrorOccured"));
        }
    }

    public void onEventSelect(SelectEvent selectEvent) {

        event = (ScheduleEvent) selectEvent.getObject();
    }

    public void onDateSelect(SelectEvent selectEvent) {
        System.out.println((Date) selectEvent.getObject());
        event = new DefaultScheduleEvent("", (Date) selectEvent.getObject(), (Date) selectEvent.getObject());
    }

    public void onEventMove(ScheduleEntryMoveEvent event) {
        FacesMessage message = new FacesMessage(FacesMessage.SEVERITY_INFO, "Event moved", "Day delta:" + event.getDayDelta() + ", Minute delta:" + event.getMinuteDelta());

        addMessage(message);
    }

    public void onEventResize(ScheduleEntryResizeEvent event) {
        FacesMessage message = new FacesMessage(FacesMessage.SEVERITY_INFO, "Event resized", "Day delta:" + event.getDayDelta() + ", Minute delta:" + event.getMinuteDelta());

        addMessage(message);

    }

    private void addMessage(FacesMessage message) {
        FacesContext.getCurrentInstance().addMessage(null, message);
    }

    public Salle getCurrentSalle() {
        return currentSalle;
    }

    public String getDateDebut() {
        return dateDebut;
    }

    public void setDateDebut(String dateDebut) {
        this.dateDebut = dateDebut;
    }

    public String getDateFin() {
        return dateFin;
    }

    public void setDateFin(String DateFin) {
        this.dateFin = DateFin;
    }

    public String getTypeReservation() {
        return typeReservation;
    }

    public void setTypeReservation(String typeReservation) {
        this.typeReservation = typeReservation;
    }

    public void setCurrentSalle(Salle currentSalle) {
        this.currentSalle = currentSalle;
    }

    public ReservationController() {
        currentSalle = new Salle();
    }

    public Reservation getSelected() {
        if (current == null) {
            current = new Reservation();
            selectedItemIndex = -1;
        }
        return current;
    }

    private ReservationFacade getFacade() {
        return ejbFacade;
    }

    public PaginationHelper getPagination() {
        if (pagination == null) {
            pagination = new PaginationHelper(10) {

                @Override
                public int getItemsCount() {
                    return getFacade().count();
                }

                @Override
                public DataModel createPageDataModel() {
                    return new ListDataModel(getFacade().findRange(new int[]{getPageFirstItem(), getPageFirstItem() + getPageSize()}));
                }
            };
        }
        return pagination;
    }

    public String prepareList() {
        recreateModel();
        return "List";
    }

    public String prepareView() {
        current = (Reservation) getItems().getRowData();
        selectedItemIndex = pagination.getPageFirstItem() + getItems().getRowIndex();
        return "View";
    }

    public String prepareCreate() {
        current = new Reservation();
        if (event.getStartDate() != null && event.getEndDate() != null) {

        }
        selectedItemIndex = -1;
        return "Create";
    }

    public String create() {

        try {
            current.setStartDate(new Date(dateDebut));
            current.setEndDate(new Date(dateFin));
            current.setType(ReservationType.valueOf(typeReservation));
            current.getSalle().add(currentSalle);
            reservations.add(current);
            getFacade().create(current);
            init();
            JsfUtil.addSuccessMessage(ResourceBundle.getBundle("/Bundle").getString("ReservationCreated"));

            return prepareCreate();
        } catch (Exception e) {
            JsfUtil.addErrorMessage(e, ResourceBundle.getBundle("/Bundle").getString("PersistenceErrorOccured"));
            return null;
        }
    }

    public String dateConverter(Date date1) {
        String l = "";
        if (date1 != null) {
            SimpleDateFormat formatDay = new SimpleDateFormat("dd/MM/yyyy");
            SimpleDateFormat formatHoure = new SimpleDateFormat("HH:mm");
            l = "Le  " + formatDay.format(date1) + " à " + formatHoure.format(date1);
        }
        return l;
    }

    public String prepareEdit() {
        current = (Reservation) getItems().getRowData();
        selectedItemIndex = pagination.getPageFirstItem() + getItems().getRowIndex();
        return "Edit";
    }

    public String update() {
        try {
            getFacade().edit(current);
            JsfUtil.addSuccessMessage(ResourceBundle.getBundle("/Bundle").getString("ReservationUpdated"));
            return "View";
        } catch (Exception e) {
            JsfUtil.addErrorMessage(e, ResourceBundle.getBundle("/Bundle").getString("PersistenceErrorOccured"));
            return null;
        }
    }

    public String destroy() {
        current = (Reservation) getItems().getRowData();
        selectedItemIndex = pagination.getPageFirstItem() + getItems().getRowIndex();
        performDestroy();
        recreatePagination();
        recreateModel();
        return "List";
    }

    public void delete() {
        System.out.println("delet");
        for (int i = 0; i < reservations.size(); i++) {
            if (reservations.get(i).getId() == current.getId()) {
                eventModel.deleteEvent(event);
            }
        }

    }

    public void annuler() {
        System.out.println("anuller()");
        System.out.println("return ");
    }

    public String destroyAndView() {
        performDestroy();
        recreateModel();
        updateCurrentItem();
        if (selectedItemIndex >= 0) {
            return "View";
        } else {
            // all items were removed - go back to list
            recreateModel();
            return "List";
        }
    }

    private void performDestroy() {
        try {
            getFacade().remove(current);
            init();
            JsfUtil.addSuccessMessage(ResourceBundle.getBundle("/Bundle").getString("ReservationDeleted"));
        } catch (Exception e) {
            JsfUtil.addErrorMessage(e, ResourceBundle.getBundle("/Bundle").getString("PersistenceErrorOccured"));
        }
    }

    private void updateCurrentItem() {
        int count = getFacade().count();
        if (selectedItemIndex >= count) {
            // selected index cannot be bigger than number of items:
            selectedItemIndex = count - 1;
            // go to previous page if last page disappeared:
            if (pagination.getPageFirstItem() >= count) {
                pagination.previousPage();
            }
        }
        if (selectedItemIndex >= 0) {
            current = getFacade().findRange(new int[]{selectedItemIndex, selectedItemIndex + 1}).get(0);
        }
    }

    public DataModel getItems() {
        if (items == null) {
            items = getPagination().createPageDataModel();
        }
        return items;
    }

    private void recreateModel() {
        items = null;
    }

    private void recreatePagination() {
        pagination = null;
    }

    public String next() {
        getPagination().nextPage();
        recreateModel();
        return "List";
    }

    public String previous() {
        getPagination().previousPage();
        recreateModel();
        return "List";
    }

    public SelectItem[] getItemsAvailableSelectMany() {
        return JsfUtil.getSelectItems(ejbFacade.findAll(), false);
    }

    public SelectItem[] getItemsAvailableSelectOne() {
        return JsfUtil.getSelectItems(ejbFacade.findAll(), true);
    }

    public Reservation getReservation(java.lang.Integer id) {
        return ejbFacade.find(id);
    }

    @FacesConverter(forClass = Reservation.class)
    public static class ReservationControllerConverter implements Converter {

        @Override
        public Object getAsObject(FacesContext facesContext, UIComponent component, String value) {
            if (value == null || value.length() == 0) {
                return null;
            }
            ReservationController controller = (ReservationController) facesContext.getApplication().getELResolver().
                    getValue(facesContext.getELContext(), null, "reservationController");
            return controller.getReservation(getKey(value));
        }

        java.lang.Integer getKey(String value) {
            java.lang.Integer key;
            key = Integer.valueOf(value);
            return key;
        }

        String getStringKey(java.lang.Integer value) {
            StringBuilder sb = new StringBuilder();
            sb.append(value);
            return sb.toString();
        }

        @Override
        public String getAsString(FacesContext facesContext, UIComponent component, Object object) {
            if (object == null) {
                return null;
            }
            if (object instanceof Reservation) {
                Reservation o = (Reservation) object;
                return getStringKey(o.getId());
            } else {
                throw new IllegalArgumentException("object " + object + " is of type " + object.getClass().getName() + "; expected type: " + Reservation.class.getName());
            }
        }

    }

    public List<Reservation> getReservations() {
        return reservations;
    }

    public void setReservations(List<Reservation> reservations) {
        this.reservations = reservations;
    }

    @PostConstruct
    public void init() {
        reservations = ejbFacade.findAll();
        eventModel = new DefaultScheduleModel();

        for (Reservation res : reservations) {
            DefaultScheduleEvent scheduleEvent = new DefaultScheduleEvent();
            scheduleEvent.setDescription(res.getDescription());
            scheduleEvent.setTitle(res.getDescription());
            scheduleEvent.setStartDate(res.getStartDate());
            scheduleEvent.setEndDate(res.getEndDate());
            scheduleEvent.setStyleClass(res.getType().toString());
            scheduleEvent.setData(res);
            String fullTitle = res.getDescription() + "" + " dans la  salle : " + res.getSalle().get(0).getNumero()
                    + "/departement : " + res.getSalle().get(0).getDepartement().getNom()
                    + " pour un " + res.getType();
            scheduleEvent.setTitle(fullTitle);
            eventModel.addEvent(scheduleEvent);
        }
//        eventModel.addEvent(new DefaultScheduleEvent("Champions League Match", previousDay8Pm(), previousDay11Pm()));
//        eventModel.addEvent(new DefaultScheduleEvent("Birthday Party", today1Pm(), today6Pm()));
//        eventModel.addEvent(new DefaultScheduleEvent("Breakfast at Tiffanys", nextDay9Am(), nextDay11Am()));
//        eventModel.addEvent(new DefaultScheduleEvent("Plant the new garden stuff", theDayAfter3Pm(), fourDaysLater3pm()));

        lazyEventModel = new LazyScheduleModel() {

            @Override
            public void loadEvents(Date start, Date end) {
                Date random = getRandomDate(start);
                addEvent(new DefaultScheduleEvent("Lazy Event 1", random, random));

                random = getRandomDate(start);
                addEvent(new DefaultScheduleEvent("Lazy Event 2", random, random));
            }
        };
    }

    public Date getRandomDate(Date base) {
        Calendar date = Calendar.getInstance();
        date.setTime(base);
        date.add(Calendar.DATE, ((int) (Math.random() * 30)) + 1);    //set random day of month

        return date.getTime();
    }

    public Date getInitialDate() {
        Calendar calendar = Calendar.getInstance();
        calendar.set(calendar.get(Calendar.YEAR), Calendar.FEBRUARY, calendar.get(Calendar.DATE), 0, 0, 0);

        return calendar.getTime();
    }

    public ScheduleModel getEventModel() {
        return eventModel;
    }

    public ScheduleModel getLazyEventModel() {
        return lazyEventModel;
    }

    private Calendar today() {
        Calendar calendar = Calendar.getInstance();
        calendar.set(calendar.get(Calendar.YEAR), calendar.get(Calendar.MONTH), calendar.get(Calendar.DATE), 0, 0, 0);

        return calendar;
    }

    private Date previousDay8Pm() {
        Calendar t = (Calendar) today().clone();
        t.set(Calendar.AM_PM, Calendar.PM);
        t.set(Calendar.DATE, t.get(Calendar.DATE) - 1);
        t.set(Calendar.HOUR, 8);

        return t.getTime();
    }

    public boolean isIsPeriodicite() {
        return isPeriodicite;
    }

    public void setIsPeriodicite(boolean isPeriodicite) {
        this.isPeriodicite = isPeriodicite;
    }

    private Date previousDay11Pm() {
        Calendar t = (Calendar) today().clone();
        t.set(Calendar.AM_PM, Calendar.PM);
        t.set(Calendar.DATE, t.get(Calendar.DATE) - 1);
        t.set(Calendar.HOUR, 11);

        return t.getTime();
    }

    private Date today1Pm() {
        Calendar t = (Calendar) today().clone();
        t.set(Calendar.AM_PM, Calendar.PM);
        t.set(Calendar.HOUR, 1);

        return t.getTime();
    }

    private Date theDayAfter3Pm() {
        Calendar t = (Calendar) today().clone();
        t.set(Calendar.DATE, t.get(Calendar.DATE) + 2);
        t.set(Calendar.AM_PM, Calendar.PM);
        t.set(Calendar.HOUR, 3);

        return t.getTime();
    }

    private Date today6Pm() {
        Calendar t = (Calendar) today().clone();
        t.set(Calendar.AM_PM, Calendar.PM);
        t.set(Calendar.HOUR, 6);

        return t.getTime();
    }

    private Date nextDay9Am() {
        Calendar t = (Calendar) today().clone();
        t.set(Calendar.AM_PM, Calendar.AM);
        t.set(Calendar.DATE, t.get(Calendar.DATE) + 1);
        t.set(Calendar.HOUR, 9);

        return t.getTime();
    }

    private Date nextDay11Am() {
        Calendar t = (Calendar) today().clone();
        t.set(Calendar.AM_PM, Calendar.AM);
        t.set(Calendar.DATE, t.get(Calendar.DATE) + 1);
        t.set(Calendar.HOUR, 11);

        return t.getTime();
    }

    private Date fourDaysLater3pm() {
        Calendar t = (Calendar) today().clone();
        t.set(Calendar.AM_PM, Calendar.PM);
        t.set(Calendar.DATE, t.get(Calendar.DATE) + 4);
        t.set(Calendar.HOUR, 3);

        return t.getTime();
    }

    public ScheduleEvent getEvent() {
        return event;
    }

    public void setEvent(ScheduleEvent event) {
        this.event = event;
    }

    public void redirect(String page) throws IOException {

        ExternalContext ec = FacesContext.getCurrentInstance().getExternalContext();
        if (page.equalsIgnoreCase("calendar")) {
            ec.redirect(ec.getRequestContextPath() + "/faces/calendar/Calendar.xhtml");
        }
        if (page.equalsIgnoreCase("update")) {
            if (event.getStyleClass().contains("rdv")) {
                ec.redirect(ec.getRequestContextPath() + "/faces/RendezVous/modifier.xhtml");
            }
            if (event.getStyleClass().contains("delimiteur")) {
                ec.redirect(ec.getRequestContextPath() + "/faces/Delimiteur/updateDelimiteur.xhtml");
            }
        }

        if (page.equalsIgnoreCase("create")) {
            ec.redirect(ec.getRequestContextPath() + "/faces/web/reservation/Create.xhtml");
        }
    }

    public void goCalendar() throws IOException {
        ExternalContext ec = FacesContext.getCurrentInstance().getExternalContext();
        ec.redirect(ec.getRequestContextPath() + "/faces/web/calendar/Calendar.xhtml");

    }

    public String dateDebutConverter() {
        Date date = event.getStartDate();
        String l = "";
        if (date != null) {
            SimpleDateFormat formatDay = new SimpleDateFormat("dd/MM/yyyy");
            SimpleDateFormat formatHoure = new SimpleDateFormat("HH:mm");

            l = "Le  " + formatDay.format(date) + " à " + formatHoure.format(date);
        }
        return l;
    }

    public String dateFinConverter() {
        Date date1 = event.getEndDate();
        String l = "";
        if (date1 != null) {
            SimpleDateFormat formatDay = new SimpleDateFormat("dd/MM/yyyy");
            SimpleDateFormat formatHoure = new SimpleDateFormat("HH:mm");
            l = "Le  " + formatDay.format(date1) + " à " + formatHoure.format(date1);
        }
        return l;
    }
}
