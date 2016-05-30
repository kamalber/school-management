/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package bean;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;

/**
 *
 * @author kamal
 */
@Entity
@PrimaryKeyJoinColumn(referencedColumnName="ID")
public class Etudiants extends Personne implements Serializable {

    private int cne;
    private  NiveauDEtude niveauEtude;

    public Etudiants(int cne) {
        this.cne = cne;
    }

    public Etudiants() {
    }

    public int getCne() {
        return cne;
    }

    public void setCne(int cne) {
        this.cne = cne;
    }

    public NiveauDEtude getNiveauEtude() {
        return niveauEtude;
    }

    public void setNiveauEtude(NiveauDEtude niveauEtude) {
        this.niveauEtude = niveauEtude;
    }

    public enum NiveauDEtude {
        MASTER,
        LICENCE,
        TRONC_COMUN 

    }
}
