package bean;

import bean.Departement;
import bean.Module;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2016-05-29T16:24:54")
@StaticMetamodel(Formation.class)
public class Formation_ { 

    public static volatile SingularAttribute<Formation, Departement> departement;
    public static volatile SingularAttribute<Formation, Integer> nombreEtudiants;
    public static volatile SingularAttribute<Formation, Integer> id;
    public static volatile SingularAttribute<Formation, String> nom;
    public static volatile ListAttribute<Formation, Module> modules;

}