/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller;

import bean.Admin;
import controller.util.JsfUtil;
import dao.AdminFacade;
import java.io.IOException;
import javax.inject.Named;
import javax.enterprise.context.SessionScoped;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.ResourceBundle;
import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.faces.application.FacesMessage;
import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;

/**
 *
 * @author kamal
 */
@Named(value = "compteController")
@SessionScoped
public class CompteController implements Serializable {

    private Admin connectedAdmin;
    private List<Admin> admins = new ArrayList<>();

    /**
     * Creates a new instance of CompteController
     */
    public CompteController() {
        connectedAdmin = new Admin();
    }
    @EJB
    AdminFacade ejbFacade;

    @PostConstruct
    public void init() {
        admins = ejbFacade.findAll();
    }

    public Admin getConnectedAdmin() {
        return connectedAdmin;
    }

    public void setConnectedAdmin(Admin connectedAdmin) {
        this.connectedAdmin = connectedAdmin;
    }

    public String login() throws IOException {
        int flage = 0;
        for (Admin utilisateur1 : admins) {
            if (utilisateur1.getLogin().equals(connectedAdmin.getLogin()) && utilisateur1.getPassword().equals(connectedAdmin.getPassword())) {
                connectedAdmin = utilisateur1;
                ExternalContext ec = FacesContext.getCurrentInstance().getExternalContext();
                FacesMessage message = new FacesMessage(FacesMessage.SEVERITY_INFO, "wellcome", "bonjour " + connectedAdmin.getLogin());
                addMessage(message);
                ec.redirect(ec.getRequestContextPath() + "/faces/web/calendar/Calendar.xhtml");
                connectedAdmin = null;
                  JsfUtil.addSuccessMessage( "bonjour "+connectedAdmin.getLogin()+" !!");
                flage = 1;
            }
        }
        if (flage == 0) {
             

            JsfUtil.addErrorMessage(new Exception("login failed"), "login failed!!");
//            FacesMessage message = new FacesMessage(FacesMessage.SEVERITY_ERROR, "erreur", "login failed!!");
//            addMessage(message);
           
        } return null;
    }
    public void logOut(){
        
    }

    private void addMessage(FacesMessage message) {
        FacesContext.getCurrentInstance().addMessage(null, message);
    }
}
