package bean;

import bean.Formation;
import bean.Reservation;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2016-05-29T16:24:54")
@StaticMetamodel(Module.class)
public class Module_ { 

    public static volatile ListAttribute<Module, Reservation> reservations;
    public static volatile SingularAttribute<Module, Integer> nombreHeures;
    public static volatile SingularAttribute<Module, Integer> id;
    public static volatile SingularAttribute<Module, Formation> formation;
    public static volatile SingularAttribute<Module, String> intitule;

}