package bean;

import bean.Module;
import bean.Reservation.ReservationType;
import bean.Salle;
import java.sql.Timestamp;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2016-06-01T21:11:18")
@StaticMetamodel(Reservation.class)
public class Reservation_ { 

    public static volatile SingularAttribute<Reservation, Timestamp> endDate;
    public static volatile ListAttribute<Reservation, Salle> salle;
    public static volatile SingularAttribute<Reservation, Module> module;
    public static volatile SingularAttribute<Reservation, String> description;
    public static volatile SingularAttribute<Reservation, Integer> id;
    public static volatile SingularAttribute<Reservation, ReservationType> type;
    public static volatile SingularAttribute<Reservation, Timestamp> startDate;

}