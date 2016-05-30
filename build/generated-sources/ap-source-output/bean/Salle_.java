package bean;

import bean.Reservation;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2016-05-29T16:24:54")
@StaticMetamodel(Salle.class)
public class Salle_ { 

    public static volatile SingularAttribute<Salle, String> Numero;
    public static volatile ListAttribute<Salle, Reservation> reservations;
    public static volatile SingularAttribute<Salle, Integer> id;

}