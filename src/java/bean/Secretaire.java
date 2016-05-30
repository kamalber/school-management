/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package bean;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;

/**
 *
 * @author kamal
 */
@Entity
@PrimaryKeyJoinColumn(referencedColumnName="ID")
public class Secretaire extends Personne implements Serializable {

  
    @OneToOne
    Departement depratement = new Departement();

    

    public Departement getDepratement() {
        return depratement;
    }

    public void setDepratement(Departement depratement) {
        this.depratement = depratement;
    }
    
    
}
