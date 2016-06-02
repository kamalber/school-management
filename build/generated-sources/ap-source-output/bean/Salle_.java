package bean;

import bean.Departement;
import bean.Reservation;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2016-06-01T21:11:18")
@StaticMetamodel(Salle.class)
public class Salle_ { 

    public static volatile SingularAttribute<Salle, String> Numero;
    public static volatile SingularAttribute<Salle, Departement> departement;
    public static volatile ListAttribute<Salle, Reservation> reservations;
    public static volatile SingularAttribute<Salle, Integer> Nbr_place;
    public static volatile SingularAttribute<Salle, Integer> id;

}