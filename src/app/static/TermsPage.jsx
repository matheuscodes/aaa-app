import React from 'react'
import { withTranslation } from 'react-i18next'

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import LogoName from 'svg/LogoName'

const styles = {}

class TermsPage extends React.Component {
  render() {
    const t = this.props.t;
    return (
      <div style={{'backgroundColor':'white', padding:'10pt'}}>
        <Card style={{margin:40,marginBottom:120}}>
          <CardHeader
            title={t('terms:title')}
            subheader={t('terms:subtitle')} />
          <CardContent style={{textAlign:"justify"}}>
            <div style={{padding:12}}>
              <LogoName width={'100%'} height={96} />
            </div>
            <img src='img/impressum.png' width={'400px'}  height={'150px'} alt="" />
            <Typography variant="h4" gutterBottom>Disclaimer – rechtliche Hinweise</Typography>
            <Typography variant="h5" gutterBottom>§ 1 Warnhinweis zu Inhalten</Typography>
            <Typography variant="p" component="p"  gutterBottom>
              Die kostenlosen und frei zugänglichen Inhalte dieser Webseite wurden mit größtmöglicher Sorgfalt erstellt. Der Anbieter dieser Webseite übernimmt jedoch keine Gewähr für die Richtigkeit und Aktualität der bereitgestellten kostenlosen und frei zugänglichen journalistischen Ratgeber und Nachrichten. Namentlich gekennzeichnete Beiträge geben die Meinung des jeweiligen Autors und nicht immer die Meinung des Anbieters wieder. Allein durch den Aufruf der kostenlosen und frei zugänglichen Inhalte kommt keinerlei Vertragsverhältnis zwischen dem Nutzer und dem Anbieter zustande, insoweit fehlt es am Rechtsbindungswillen des Anbieters.
            </Typography>

            <Typography variant="h5" gutterBottom>§ 2 Externe Links</Typography>
            <Typography variant="p" component="p" gutterBottom>
              Diese Website enthält Verknüpfungen zu Websites Dritter ("externe Links"). Diese Websites unterliegen der Haftung der jeweiligen Betreiber. Der Anbieter hat bei der erstmaligen Verknüpfung der externen Links die fremden Inhalte daraufhin überprüft, ob etwaige Rechtsverstöße bestehen. Zu dem Zeitpunkt waren keine Rechtsverstöße ersichtlich. Der Anbieter hat keinerlei Einfluss auf die aktuelle und zukünftige Gestaltung und auf die Inhalte der verknüpften Seiten. Das Setzen von externen Links bedeutet nicht, dass sich der Anbieter die hinter dem Verweis oder Link liegenden Inhalte zu Eigen macht. Eine ständige Kontrolle der externen Links ist für den Anbieter ohne konkrete Hinweise auf Rechtsverstöße nicht zumutbar. Bei Kenntnis von Rechtsverstößen werden jedoch derartige externe Links unverzüglich gelöscht.
            </Typography>

            <Typography variant="h5" gutterBottom>§ 3 Urheber- und Leistungsschutzrechte</Typography>
            <Typography variant="p" component="p" gutterBottom>
              Die auf dieser Website veröffentlichten Inhalte unterliegen dem deutschen Urheber- und Leistungsschutzrecht. Jede vom deutschen Urheber- und Leistungsschutzrecht nicht zugelassene Verwertung bedarf der vorherigen schriftlichen Zustimmung des Anbieters oder jeweiligen Rechteinhabers. Dies gilt insbesondere für Vervielfältigung, Bearbeitung, Übersetzung, Einspeicherung, Verarbeitung bzw. Wiedergabe von Inhalten in Datenbanken oder anderen elektronischen Medien und Systemen. Inhalte und Rechte Dritter sind dabei als solche gekennzeichnet. Die unerlaubte Vervielfältigung oder Weitergabe einzelner Inhalte oder kompletter Seiten ist nicht gestattet und strafbar. Lediglich die Herstellung von Kopien und Downloads für den persönlichen, privaten und nicht kommerziellen Gebrauch ist erlaubt.
            </Typography>
            <Typography variant="p" component="p" gutterBottom>
              Die Darstellung dieser Website in fremden Frames ist nur mit schriftlicher Erlaubnis zulässig.
            </Typography>

            <Typography variant="h5" gutterBottom>§ 4 Besondere Nutzungsbedingungen</Typography>
            <Typography variant="p" component="p" gutterBottom>
              Soweit besondere Bedingungen für einzelne Nutzungen dieser Website von den vorgenannten Paragraphen abweichen, wird an entsprechender Stelle ausdrücklich darauf hingewiesen. In diesem Falle gelten im jeweiligen Einzelfall die besonderen Nutzungsbedingungen.
            </Typography>
            <Typography variant="p" component="p">
              Quelle: <a href="https://www.juraforum.de/impressum-generator/">Impressum Generator von JuraForum.de</a>
            </Typography>

            <Typography variant="h4" gutterBottom>Datenschutz</Typography>

            <Typography variant="p" component="p" gutterBottom>
              Wir informieren Sie nachfolgend gemäß den gesetzlichen Vorgaben des Datenschutzrechts (insb. gemäß BDSG n.F. und der europäischen Datenschutz-Grundverordnung ‚DS-GVO‘) über die Art, den Umfang und Zweck der Verarbeitung personenbezogener Daten durch unser Unternehmen. Diese Datenschutzerklärung gilt auch für unsere Websites und Sozial-Media-Profile. Bezüglich der Definition von Begriffen wie etwa „personenbezogene Daten“ oder „Verarbeitung“ verweisen wir auf Art. 4 DS-GVO.
            </Typography>

					  <Typography variant="h6" gutterBottom>Name und Kontaktdaten des / der Verantwortlichen</Typography>
            <Typography variant="p" component="p" gutterBottom>
            Unser/e Verantwortliche/r (nachfolgend „Verantwortlicher“) i.S.d. Art. 4 Zif. 7 DS-GVO ist:
            </Typography>
			      <img src='img/impressum.png' width={'400px'}  height={'150px'} alt="" />
            <Typography variant="h6" gutterBottom>Datenschutzbeauftragte/r</Typography>
            <img src='img/impressum.png' width={'400px'}  height={'150px'} alt="" />

            <Typography variant="h6" gutterBottom>Datenarten, Zwecke der Verarbeitung und Kategorien betroffener Personen</Typography>
            <Typography variant="p" component="p" gutterBottom>
              Nachfolgend informieren wir Sie über Art, Umfang und Zweck der Erhebung, Verarbeitung und Nutzung personenbezogener Daten.
            </Typography>

            <Typography variant="subtitle1" gutterBottom>1. Arten der Daten, die wir verarbeiten</Typography>
            <Typography variant="p" component="p" gutterBottom>
              Nutzungsdaten (Zugriffszeiten, besuchte Websites etc.), Bestandsdaten (Name, Adresse etc.), Kontaktdaten (Telefonnummer, E-Mail, Fax etc.), Inhaltsdaten (Texteingaben, Videos, Fotos etc.), Kommunikationsdaten (IP-Adresse etc.), Leistungsdaten (Pfeilen, Ergebnisse, Trainingsverhalten, etc.), Vereinsdaten (Mitglieder, Aufgaben, Trainer, etc.)
            </Typography>
            <Typography variant="subtitle1" gutterBottom>2. Zwecke der Verarbeitung nach Art. 13 Abs. 1 c) DS-GVO</Typography>
            <Typography variant="p" component="p" gutterBottom>
              Website technisch und wirtschaftlich optimieren, Leichten Zugang zur Website ermöglichen, Optimierung und statistische Auswertung unserer Dienste, Nutzererfahrung verbessern, Website benutzerfreundlich gestalten, Wirtschaftlicher Betrieb der Werbung und Website, Erstellung von Statistiken, Websites mit Funktionen und Inhalten bereitstellen, Unterbrechungsfreier,sicherer Betrieb unserer Website, <br />
            </Typography>
            <Typography variant="subtitle1" gutterBottom>3. Kategorien der betroffenen Personen nach Art. 13 Abs. 1 e) DS-GVO</Typography>
            <Typography variant="p" component="p" gutterBottom>
              Besucher/Nutzer der Website, Kunden. Die betroffenen Personen werden zusammenfassend als „Nutzer“ bezeichnet.
            </Typography>

            <Typography variant="h6" gutterBottom>Rechtsgrundlagen der Verarbeitung personenbezogener Daten</Typography>
            <Typography variant="p" component="p" gutterBottom>
              Nachfolgend Informieren wir Sie über die Rechtsgrundlagen der Verarbeitung personenbezogener Daten:
              <ol>
                  <li>Wenn wir Ihre Einwilligung für die Verarbeitung personenbezogenen Daten eingeholt haben, ist Art. 6 Abs. 1 S. 1 lit. a) DS-GVO Rechtsgrundlage.</li>
                  <li>Ist die Verarbeitung zur Erfüllung eines Vertrags oder zur Durchführung vorvertraglicher Maßnahmen erforderlich, die auf Ihre Anfrage hin erfolgen, so ist Art. 6 Abs. 1 S. 1 lit. b) DS-GVO Rechtsgrundlage.</li>
                  <li>Ist die Verarbeitung zur Erfüllung einer rechtlichen Verpflichtung erforderlich, der wir unterliegen (z.B. gesetzliche Aufbewahrungspflichten), so ist Art. 6 Abs. 1 S. 1 lit. c) DS-GVO Rechtsgrundlage.</li>
                  <li>Ist die Verarbeitung erforderlich, um lebenswichtige Interessen der betroffenen Person oder einer anderen natürlichen Person zu schützen, so ist Art. 6 Abs. 1 S. 1 lit. d) DS-GVO Rechtsgrundlage.</li>
                  <li>Ist die Verarbeitung zur Wahrung unserer oder der berechtigten Interessen eines Dritten erforderlich und überwiegen diesbezüglich Ihre Interessen oder Grundrechte und Grundfreiheiten nicht, so ist Art. 6 Abs. 1 S. 1 lit. f) DS-GVO Rechtsgrundlage.</li>
              </ol>
            </Typography>

            <Typography variant="h6" gutterBottom>Weitergabe personenbezogener Daten an Dritte und Auftragsverarbeiter</Typography>
            <Typography variant="p" component="p" gutterBottom>
              Ohne Ihre Einwilligung geben wir grundsätzlich keine Daten an Dritte weiter. Sollte dies doch der Fall sein, dann erfolgt die Weitergabe auf der Grundlage der zuvor genannten Rechtsgrundlagen z.B. bei der Weitergabe von Daten an Online-Paymentanbieter zur Vertragserfüllung oder aufgrund gerichtlicher Anordnung oder wegen einer gesetzlichen Verpflichtung zur Herausgabe der Daten zum Zwecke der Strafverfolgung, zur Gefahrenabwehr oder zur Durchsetzung der Rechte am geistigen Eigentum.<br />
              Wir setzen zudem Auftragsverarbeiter (externe Dienstleister z.B. zum Webhosting unserer Websites und Datenbanken) zur Verarbeitung Ihrer Daten ein. Wenn im Rahmen einer Vereinbarung zur Auftragsverarbeitung an die Auftragsverarbeiter Daten weitergegeben werden, erfolgt dies immer nach Art. 28 DS-GVO. Wir wählen dabei unsere Auftragsverarbeiter sorgfältig aus, kontrollieren diese regelmäßig und haben uns ein Weisungsrecht hinsichtlich der Daten einräumen lassen. Zudem müssen die Auftragsverarbeiter geeignete technische und organisatorische Maßnahmen getroffen haben und die Datenschutzvorschriften gem. BDSG n.F. und DS-GVO einhalten
            </Typography>

            <Typography variant="h6" gutterBottom>Datenübermittlung in Drittstaaten</Typography>
            <Typography variant="p" component="p" gutterBottom>
              Durch die Verabschiedung der europäischen Datenschutz-Grundverordnung (DS-GVO) wurde eine einheitliche Grundlage für den Datenschutz in Europa geschaffen. Ihre Daten werden daher vorwiegend durch Unternehmen verarbeitet, für die DS-GVO Anwendung findet. Sollte doch die Verarbeitung durch Dienste Dritter außerhalb der Europäischen Union oder des Europäischen Wirtschaftsraums stattfinden, so müssen diese die besonderen Voraussetzungen der Art. 44 ff. DS-GVO erfüllen. Das bedeutet, die Verarbeitung erfolgt aufgrund besonderer Garantien, wie etwa die von der EU-Kommission offiziell anerkannte Feststellung eines der EU entsprechenden Datenschutzniveaus oder der Beachtung offiziell anerkannter spezieller vertraglicher Verpflichtungen, der so genannten „Standardvertragsklauseln“. Bei US-Unternehmen erfüllt die Unterwerfung unter das sog. „Privacy-Shield“, dem Datenschutzabkommen zwischen der EU und den USA, diese Voraussetzungen.
            </Typography>

            <Typography variant="h6" gutterBottom>Löschung von Daten und Speicherdauer</Typography>
            <Typography variant="p" component="p" gutterBottom>
              Sofern nicht in dieser Datenschutzerklärung ausdrücklich angegeben, werden Ihre personenbezogen Daten gelöscht oder gesperrt, sobald die zur Verarbeitung erteilte Einwilligung von Ihnen widerrufen wird oder der Zweck für die Speicherung entfällt bzw. die Daten für den Zweck nicht mehr erforderlich sind, es sei denn deren weitere Aufbewahrung ist zu Beweiszwecken erforderlich oder dem stehen gesetzliche Aufbewahrungspflichten entgegenstehen. Darunter fallen etwa handelsrechtliche Aufbewahrungspflichten von Geschäftsbriefen nach § 257 Abs. 1 HGB (6 Jahre) sowie steuerrechtliche Aufbewahrungspflichten nach § 147 Abs. 1 AO von Belegen (10 Jahre). Wenn die vorgeschriebene Aufbewahrungsfrist abläuft, erfolgt eine Sperrung oder Löschung Ihrer Daten, es sei denn die Speicherung ist weiterhin für einen Vertragsabschluss oder zur Vertragserfüllung erforderlich.
            </Typography>

            <Typography variant="h6" gutterBottom>Bestehen einer automatisierten Entscheidungsfindung</Typography>
            <Typography variant="p" component="p" gutterBottom>
              Wir setzen keine automatische Entscheidungsfindung oder ein Profiling ein.
            </Typography>

            <Typography variant="h6" gutterBottom>Bereitstellung unserer Website und Erstellung von Logfiles</Typography>
            <Typography variant="p" component="p" gutterBottom>
              <ol>
                   <li>Wenn Sie unsere Webseite lediglich informatorisch nutzen (also keine Registrierung und auch keine anderweitige Übermittlung von Informationen), erheben wir nur die personenbezogenen Daten, die Ihr Browser an unseren Server übermittelt. Wenn Sie unsere Website betrachten möchten, erheben wir die folgenden Daten:<br />
                  • IP-Adresse;<br />
                  • Internet-Service-Provider des Nutzers;<br />
                  • Datum und Uhrzeit des Abrufs;<br />
                  • Browsertyp;<br />
                  • Sprache und Browser-Version;<br />
                  • Inhalt des Abrufs;<br />
                  • Zeitzone;<br />
                  • Zugriffsstatus/HTTP-Statuscode;<br />
                  • Datenmenge;<br />
                  • Websites, von denen die Anforderung kommt;<br />
                  • Betriebssystem.<br />
                  Eine Speicherung dieser Daten zusammen mit anderen personenbezogenen Daten von Ihnen findet nicht statt.<br /><br />
                   </li>
                  <li>Diese Daten dienen dem Zweck der nutzerfreundlichen, funktionsfähigen und sicheren Auslieferung unserer Website an Sie mit Funktionen und Inhalten sowie deren Optimierung und statistischen Auswertung.<br /><br /></li>
                  <li>Rechtsgrundlage hierfür ist unser in den obigen Zwecken auch liegendes berechtigtes Interesse an der Datenverarbeitung nach Art. 6 Abs. 1 S.1 lit. f)  DS-GVO.<br /><br /></li>
                  <li>Wir speichern aus Sicherheitsgründen diese Daten in Server-Logfiles für die Speicherdauer von 30 Tagen. Nach Ablauf dieser Frist werden diese automatisch gelöscht, es sei denn wir benötigen deren Aufbewahrung zu Beweiszwecken bei Angriffen auf die Serverinfrastruktur oder anderen Rechtsverletzungen.<br /></li>
              </ol>
            </Typography>

            <Typography variant="h6" gutterBottom>Cookies und LocalStorage</Typography>
            <Typography variant="p" component="p" gutterBottom>
              <ol>
                <li>Wir verwenden sog. Cookies und LocalStorage bei Ihrem Besuch unserer Website. Cookies und LocalStorage sind kleine Textdateien, die Ihr Internet-Browser auf Ihrem Rechner ablegt und speichert. Wenn Sie unsere Website erneut aufrufen, geben diese Cookies Informationen ab, um Sie automatisch wiederzuerkennen. Zu den Cookies zählen auch die sog. „Nutzer-IDs“, wo Angaben der Nutzer mittels pseudonymisierter Profile gespeichert werden. Wir informieren Sie dazu beim Aufruf unserer Website mittels eines Hinweises auf unsere Datenschutzerklärung über die Verwendung von Cookies zu den zuvor genannten Zwecken und wie Sie dieser widersprechen bzw. deren Speicherung verhindern können („Opt-out“).<br /><br />
                  <strong>Es werden folgende Cookie-Arten unterschieden:</strong><br/>
                  <strong>• Notwendige, essentielle Cookies:</strong> Essentielle Cookies sind Cookies, die zum Betrieb der Webseite unbedingt erforderlich sind, um bestimmte Funktionen der Webseite wie Logins, Warenkorb oder Nutzereingaben z.B. bzgl. Sprache der Webseite zu speichern.<br/>
                  <strong>• Session-Cookies:</strong> Session-Cookies werden zum Wiedererkennen mehrfacher Nutzung eines Angebots durch denselben Nutzer (z.B. wenn Sie sich eingeloggt haben zur Feststellung Ihres Login-Status) benötigt. Wenn Sie unsere Seite erneut aufrufen, geben diese Cookies Informationen ab, um Sie automatisch wiederzuerkennen. Die so erlangten Informationen dienen dazu, unsere Angebote zu optimieren und Ihnen einen leichteren Zugang auf unsere Seite zu ermöglichen. Wenn Sie den Browser schließen oder Sie sich ausloggen, werden die Session-Cookies gelöscht.<br/>
                  <strong>• Persistente Cookies:</strong> Diese Cookies bleiben auch nach dem Schließen des Browsers gespeichert. Sie dienen zur Speicherung des Logins, der Reichweitenmessung und zu Marketingzwecken. Diese werden automatisiert nach einer vorgegebenen Dauer gelöscht, die sich je nach Cookie unterscheiden kann. In den Sicherheitseinstellungen Ihres Browsers können Sie die Cookies jederzeit löschen.<br/>
                  <strong>• Cookies von Drittanbietern (Third-Party-Cookies insb. von Werbetreibenden):</strong> Entsprechend Ihren Wünschen können Sie können Ihre Browser-Einstellung konfigurieren und z. B. Die Annahme von Third-Party-Cookies oder allen Cookies ablehnen. Wir weisen Sie jedoch an dieser Stelle darauf hin, dass Sie dann eventuell nicht alle Funktionen dieser Website nutzen können. Lesen Sie Näheres zu diesen Cookies bei den jeweiligen Datenschutzerklärungen zu den Drittanbietern.<br/>
                  <strong>• LocalStorage:</strong>  Die localStorage-Eigenschaft erlaubt den Zugriff auf ein lokales Storage-Objekt. In localStorage gespeicherte Daten besitzen kein Verfallsdatum. Die größten Unterschiede zwischen Cookies und WebStorage API ist die Speichergröße. Diese liegt bei einem Cookie bei 4096 Bytes und bei Localstorage/Sessionstorage bei 5MB. Der zweite Unterschied ist, dass Cookies an den Server gesendet werden. Die Storages speichern alles nur lokal und senden es nicht an den Server.<br/><br/>
                </li>
                <li><strong>Datenkategorien:</strong> Nutzerdaten, Cookie, Nutzer-ID (inb. die besuchten Seiten, Geräteinformationen, Zugriffszeiten und IP-Adressen), Berechtigung JWT Token.<br/><br/></li>
                <li><strong>Zwecke der Verarbeitung:</strong> Die so erlangten Informationen dienen dem Zweck, unsere Webangebote technisch und wirtschaftlich instand zu setzen, zu optimieren und Ihnen einen leichteren und sicheren Zugang auf unsere Website zu ermöglichen.<br/><br/></li>
                <li><strong>Rechtsgrundlagen:</strong> Wenn wir Ihre personenbezogenen Daten mit Hilfe von Cookies aufgrund Ihrer Einwilligung verarbeiten („Opt-in“), dann ist Art. 6 Abs. 1 S. 1 lit. a) DSGVO die Rechtsgrundlage. Ansonsten haben wir ein berechtigtes Interesse an der effektiven Funktionalität, Verbesserung und wirtschaftlichen Betrieb der Website, so dass in dem Falle Art. 6 Abs. 1 S. 1 lit. f) DS-GVO Rechtsgrundlage ist. Rechtsgrundlage ist zudem Art. 6 Abs. 1 S. 1 lit. b) DS-GVO, wenn die Cookies zur Vertragsanbahnung z.B. bei Bestellungen gesetzt werden.<br/><br/></li>
                <li>
                  <strong>Speicherdauer/ Löschung:</strong> Die Daten werden gelöscht, sobald sie für die Erreichung des Zweckes ihrer Erhebung nicht mehr erforderlich sind. Im Falle der Erfassung der Daten zur Bereitstellung der Website ist dies der Fall, wenn die jeweilige Session beendet ist.<br/>Cookies werden ansonsten auf Ihrem Computer gespeichert und von diesem an unsere Seite übermittelt. Daher haben Sie als Nutzer auch die volle Kontrolle über die Verwendung von Cookies. Durch eine Änderung der Einstellungen in Ihrem Internetbrowser können Sie die Übertragung von Cookies deaktivieren oder einschränken. Bereits gespeicherte Cookies können jederzeit gelöscht werden. Dies kann auch automatisiert erfolgen. Werden Cookies für unsere Website deaktiviert, können möglicherweise nicht mehr alle Funktionen der Website vollumfänglich genutzt werden.<br/>
                  <strong>Hier finden Sie Informationen zur L&ouml;schung von Cookies nach Browsern:</strong><br/>
                  <strong>• Chrome:</strong> <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">https://support.google.com/chrome/answer/95647</a><br/>
                  <strong>• Safari:</strong> <a href="https://support.apple.com/de-at/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">https://support.apple.com/de-at/guide/safari/sfri11471/mac</a><br/>
                  <strong>• Firefox:</strong> <a href="https://support.mozilla.org/de/kb/cookies-und-website-daten-in-firefox-loschen" target="_blank" rel="noopener noreferrer">https://support.mozilla.org/de/kb/cookies-und-website-daten-in-firefox-loschen</a><br/>
                  <strong>• Internet Explorer:</strong> <a href="https://support.microsoft.com/de-at/help/17442/windows-internet-explorer-delete-manage-cookies" target="_blank" rel="noopener noreferrer">https://support.microsoft.com/de-at/help/17442/windows-internet-explorer-delete-manage-cookies</a><br/>
                  <strong>• Microsoft Edge:</strong> <a href="https://support.microsoft.com/de-at/help/4027947/windows-delete-cookies" target="_blank" rel="noopener noreferrer">https://support.microsoft.com/de-at/help/4027947/windows-delete-cookies</a><br/>
                  <br/>
                </li>
                <li><strong>Widerspruch und „Opt-Out“:</strong> Das Speichern von Cookies auf Ihrer Festplatte können Sie unabhängig von einer Einwilligung oder gesetzlichen Erlaubnis allgemein verhindern, indem Sie in Ihren Browser-Einstellungen „keine Cookies akzeptieren“ wählen. Dies kann aber eine Funktionseinschränkung unserer Angebote zur Folge haben. Sie können dem Einsatz von Cookies von Drittanbietern zu Werbezwecken über ein sog. „Opt-out“ über diese amerikanische Website (https://optout.aboutads.info) oder diese europäische Website (http://www.youronlinechoices.com/de/praferenzmanagement/) widersprechen.<br /><br /></li>
              </ol>
            </Typography>

            <Typography variant="h6" gutterBottom>Kontaktaufnahme per Kontaktformular / E-Mail / Fax / Post</Typography>
            <Typography variant="p" component="p" gutterBottom>
        			<ol>
        				<li>Bei der Kontaktaufnahme mit uns per Kontaktformular, Fax, Post oder E-Mail werden Ihre Angaben zum Zwecke der Abwicklung der Kontaktanfrage verarbeitet.<br/><br/></li>
        				<li>Rechtsgrundlage für die Verarbeitung der Daten ist bei Vorliegen einer Einwilligung von Ihnen Art. 6 Abs. 1 S. 1 lit. a) DS-GVO. Rechtsgrundlage für die Verarbeitung der Daten, die im Zuge einer Kontaktanfrage oder E-Mail, eines Briefes oder Faxes übermittelt werden, ist Art. 6 Abs. 1 S. 1 lit. f) DS-GVO. Der Verantwortliche hat ein berechtigtes Interesse an der Verarbeitung und Speicherung der Daten, um Anfragen der Nutzer beantworten zu können, zur Beweissicherung aus Haftungsgründen und um ggf. seiner gesetzlichen Aufbewahrungspflichten bei Geschäftsbriefen nachkommen zu können. Zielt der Kontakt auf den Abschluss eines Vertrages ab, so ist zusätzliche Rechtsgrundlage für die Verarbeitung Art. 6 Abs. 1 S. 1 lit. b) DS-GVO.<br/><br/></li>
        				<li>Wir können Ihre Angaben und Kontaktanfrage in unserem Customer-Relationship-Management System ("CRM System") oder einem vergleichbaren System speichern.<br/><br/></li>
        				<li>Die Daten werden gelöscht, sobald sie für die Erreichung des Zweckes ihrer Erhebung nicht mehr erforderlich sind. Für die personenbezogenen Daten aus der Eingabemaske des Kontaktformulars und diejenigen, die per E-Mail übersandt wurden, ist dies dann der Fall, wenn die jeweilige Konversation mit Ihnen beendet ist. Beendet ist die Konversation dann, wenn sich aus den Umständen entnehmen lässt, dass der betroffene Sachverhalt abschließend geklärt ist. Anfragen von Nutzern, die über einen Account bzw. Vertrag mit uns verfügen, speichern wir bis zum Ablauf von zwei Jahren nach Vertragsbeendigung. Im Fall von gesetzlichen Archivierungspflichten erfolgt die Löschung nach deren Ablauf: Ende handelsrechtlicher (6 Jahre) und steuerrechtlicher (10 Jahre) Aufbewahrungspflicht.<br/><br/></li>
        				<li>Sie haben jederzeit die Möglichkeit, die Einwilligung nach Art. 6 Abs. 1 S. 1 lit. a) DS-GVO zur Verarbeitung der personenbezogenen Daten zu widerrufen. Nehmen Sie per E-Mail Kontakt mit uns auf, so können Sie der Speicherung der personenbezogenen Daten jederzeit widersprechen.</li>
        			</ol>
            </Typography>
	          <Typography variant="h6" gutterBottom>Newsletter</Typography>
            <Typography variant="p" component="p" gutterBottom>
        			<ol>
        				<li>Unseren Newsletter können Sie mit Ihrer freiwilligen Einwilligung durch Eintragung Ihrer E-Mail-Adresse abonnieren. Nur diese ist Pflicht. Die Angabe weiterer Daten ist freiwillig und dient nur dem Zweck einer persönlichen Ansprache. Wir verwenden dabei zur Anmeldung das sog. „Double-Opt-in-Verfahren“. Nach Ihrer Anmeldung mit Ihrer E-Mail erhalten Sie von uns zur Bestätigung Ihrer Anmeldung eine E-Mail mit einem Link zur Bestätigung. Wenn Sie diesen Bestätigungslink klicken, wird Ihre E-Mail in den Newsletterverteiler aufgenommen und zum Zweck der Übersendung von E-Mails gespeichert. Sollten Sie den Klick auf den Bestätigungslink nicht innerhalb von 7  Stunden durchführen, werden Ihre Anmeldedaten gesperrt und nach 7 Tagen automatisch gelöscht. <br /><br /></li>
        				<li>Zudem protokollieren wir Ihre bei der Anmeldung verwendete IP-Adresse sowie das Datum und die Uhrzeit des Double-Opt-ins (Anmeldung und Bestätigung). Zweck dieser Speicherung ist Erfüllung von rechtlichen Anforderungen hinsichtlich des Nachweises Ihrer Anmeldung sowie die Missbrauchsprävention hinsichtlich Ihrer E-Mail.<br /><br /></li>
        				<li>Im Rahmen Ihrer Einwilligungserklärung werden die Inhalte (z.B. beworbene Produkte/Dienstleistungen, Angebote, Werbung und Themen) des Newsletters konkret beschrieben.<br /><br /></li>
                <li>Wir nutzen zum E-Mail-Versand folgenden Versanddienstleister: <br />AWS SES (38 Avenue John F. Kennedy, L-1855, Luxembourg), dessen Datenschutzerklärung finden Sie hier <a href="https://aws.amazon.com/compliance/data-privacy/" rel="noopener noreferrer" target="_blank">https://aws.amazon.com/compliance/data-privacy/</a>. Wir haben mit dem Versanddienstleister eine Vereinbarung zur Auftragsverarbeitung nach Art. 28 DS-GVO abgeschlossen.<br /><br /></li>
                <li>Beim Versand des Newsletters werten wir Ihr Nutzerverhalten aus. Die Newsletter  beinhalten dafür sogenannte „Web-Beacons“ bzw. „Tracking-Pixel“, die beim Öffnen des Newsletters aufgerufen werden. Für die Auswertungen verknüpfen wir die Web-Beacons mit Ihrer E-Mail-Adresse und einer individuellen ID. Auch im Newsletter erhaltene Links enthalten diese ID. Die Daten werden ausschließlich pseudonymisiert erhoben, die IDs werden also nicht mit Ihren weiteren persönlichen Daten verknüpft, eine direkte Personenbeziehbarkeit wird ausgeschlossen. Mit diesen Daten können wir feststellen, ob und wann Sie den Newsletter geöffnet haben und welche Links im Newsletter geklickt worden sind. Dies dient dem Zweck der Optimierung und statistischen Auswertung unseres Newsletters.<br /><br /></li>
                <li>Rechtsgrundlage für den Newsletterversand, Erfolgsmessung und die Speicherung der E-Mail ist Ihre Einwilligung gem. Art. 6 Abs. 1 S. 1 lit. a) DS-GVO i.V.m § 7 Abs. 2 Nr. 3 UWG und für die Protokollierung der Einwilligung Art. 6 Abs. 1 S. 1 lit. f) DS-GVO, da diese unserem berechtigten Interesse der juristischen Beweisbarkeit dient.<br /><br /></li>
        				<li>Dem Tracking können Sie jederzeit widersprechen, indem Sie den Abmeldelink am Ende des Newsletters klicken. In dem Falle würde allerdings auch der Newsletterempfang beendet. Wenn Sie in Ihrer E-Mail-Software die Anzeige von Bildern deaktivieren, ist ein Tracking ebenfalls nicht möglich. Dies kann allerdings Einschränkungen hinsichtlich der Funktionen des Newsletters haben und enthaltene Bilder werden dann nicht angezeigt.<br /><br /></li>
        				<li>Sie können Ihre Einwilligung in die Übersendung des Newsletters jederzeit widerrufen. Sie können den Widerruf durch Betätigung des Abmeldelinks am Ende des Newsletters, eine E-Mail oder Mitteilung an unsere obigen Kontaktdaten ausüben. Wir speichern Ihre Daten, solange Sie den Newsletter abonniert haben. Nach der Abmeldung werden Ihre Daten nur noch anonym zu statistischen Zwecken gespeichert.<br /><br /></li>
        			</ol>
            </Typography>

            <Typography variant="h6" gutterBottom>Rechte der betroffenen Person</Typography>
            <Typography variant="p" component="p" gutterBottom>
              <ol>
                <li>
                  <strong>
                    Widerspruch oder Widerruf gegen die Verarbeitung Ihrer Daten<br /><br />
                    Soweit die Verarbeitung auf Ihrer Einwilligung gemäß Art. 6 Abs. 1 S. 1 lit. a), Art. 7 DS-GVO beruht, haben Sie das Recht, die Einwilligung jederzeit zu widerrufen. Die Rechtmäßigkeit der aufgrund der Einwilligung bis zum Widerruf erfolgten Verarbeitung wird dadurch nicht berührt.<br /><br />
                    Soweit wir die Verarbeitung Ihrer personenbezogenen Daten auf die Interessenabwägung gemäß Art. 6 Abs. 1 S. 1 lit. f) DS-GVO stützen, können Sie Widerspruch gegen die Verarbeitung einlegen. Dies ist der Fall, wenn die Verarbeitung insbesondere nicht zur Erfüllung eines Vertrags mit Ihnen erforderlich ist, was von uns jeweils bei der nachfolgenden Beschreibung der Funktionen dargestellt wird. Bei Ausübung eines solchen Widerspruchs bitten wir um Darlegung der Gründe, weshalb wir Ihre personenbezogenen Daten nicht wie von uns durchgeführt verarbeiten sollten. Im Falle Ihres begründeten Widerspruchs prüfen wir die Sachlage und werden entweder die Datenverarbeitung einstellen bzw. anpassen oder Ihnen unsere zwingenden schutzwürdigen Gründe aufzeigen, aufgrund derer wir die Verarbeitung fortführen.<br /><br />
                    Sie können der Verarbeitung Ihrer personenbezogenen Daten für Zwecke der Werbung und Datenanalyse jederzeit widersprechen. Das Widerspruchsrecht können Sie kostenfrei ausüben. Über Ihren Werbewiderspruch können Sie uns unter folgenden Kontaktdaten informieren:<br/></strong>
                    <img src='img/impressum.png' width={'400px'}  height={'150px'} alt="" />
                </li>
                <li><strong>Recht auf Auskunft</strong><br />
                  Sie haben das Recht, von uns eine Bestätigung darüber zu verlangen, ob Sie betreffende personenbezogene Daten verarbeitet werden. Sofern dies der Fall ist, haben Sie ein Recht auf Auskunft über Ihre bei uns gespeicherten persönlichen Daten nach Art. 15 DS-GVO. Dies beinhaltet insbesondere die Auskunft über die Verarbeitungszwecke, die Kategorie der personenbezogenen Daten, die Kategorien von Empfängern, gegenüber denen Ihre Daten offengelegt wurden oder werden, die geplante Speicherdauer, die Herkunft ihrer Daten, sofern diese nicht direkt bei Ihnen erhoben wurden.<br /><br /></li>
                <li><strong>Recht auf Berichtigung</strong><br />
                  Sie haben ein Recht auf Berichtigung unrichtiger oder auf Vervollständigung richtiger Daten nach Art. 16 DS-GVO.
                  <br /><br />
                </li>
                <li><strong>Recht auf Löschung</strong><br />
                  Sie haben ein Recht auf Löschung Ihrer bei uns gespeicherten Daten nach Art. 17 DS-GVO, es sei denn gesetzliche oder vertraglichen Aufbewahrungsfristen oder andere gesetzliche Pflichten bzw. Rechte zur weiteren Speicherung stehen dieser entgegen.
                  <br /><br />
                </li>
                <li><strong>Recht auf Einschränkung</strong><br />
                  Sie haben das Recht, eine Einschränkung bei der Verarbeitung Ihrer personenbezogenen Daten zu verlangen, wenn eine der Voraussetzungen in Art. 18 Abs. 1 lit. a) bis d) DS-GVO erfüllt ist:<br />
                  • Wenn Sie die Richtigkeit der Sie betreffenden personenbezogenen für eine Dauer bestreiten, die es dem Verantwortlichen ermöglicht, die Richtigkeit der personenbezogenen Daten zu überprüfen;<br />
                  • die Verarbeitung unrechtmäßig ist und Sie die Löschung der personenbezogenen Daten ablehnen und stattdessen die Einschränkung der Nutzung der personenbezogenen Daten verlangen;<br />
                  • der Verantwortliche die personenbezogenen Daten für die Zwecke der Verarbeitung nicht länger benötigt, Sie diese jedoch zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen benötigen, oder<br />
                  • wenn Sie Widerspruch gegen die Verarbeitung gemäß Art. 21 Abs. 1 DS-GVO eingelegt haben und noch nicht feststeht, ob die berechtigten Gründe des Verantwortlichen gegenüber Ihren Gründen überwiegen.<br /><br />
                </li>
                <li><strong>Recht auf Datenübertragbarkeit</strong><br />
                  Sie haben ein Recht auf Datenübertragbarkeit nach Art. 20 DS-GVO, was bedeutet, dass Sie die bei uns über Sie gespeicherten personenbezogenen Daten in einem strukturierten, gängigen und maschinenlesbaren Format erhalten können oder die Übermittlung an einen anderen Verantwortlichen verlangen können.
                  <br /><br />
                </li>
                <li><strong>Recht auf Beschwerde</strong><br />
                  Sie haben ein Recht auf Beschwerde bei einer Aufsichtsbehörde. In der Regel können Sie sich hierfür an die Aufsichtsbehörde insbesondere in dem Mitgliedstaat ihres Aufenthaltsorts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes wenden.
                  <br /><br />
                </li>
              </ol>
            </Typography>
			      <Typography variant="h6" gutterBottom>Datensicherheit</Typography>
            <Typography variant="p" component="p" gutterBottom>
              Um alle personenbezogen Daten, die an uns übermittelt werden, zu schützen und um sicherzustellen, dass die Datenschutzvorschriften von uns, aber auch unseren externen Dienstleistern eingehalten werden, haben wir geeignete technische und organisatorische Sicherheitsmaßnahmen getroffen. Deshalb werden unter anderem alle Daten zwischen Ihrem Browser und unserem Server über eine sichere SSL-Verbindung verschlüsselt übertragen.
            </Typography>
            <Typography variant="p" component="p" gutterBottom>
              Quelle: <a href="https://www.juraforum.de/datenschutzerklaerung-muster/">Datenschutzerklärung Muster von www.juraforum.de</a>
            </Typography>

            <Typography variant="h4">{t('terms:rights.title')}</Typography>
              <p>
                <a href={'https://github.com/matheuscodes/aaa-app'}>Advanced Archery Application Code</a><br/>
                Copyright © 2015-2020 Matheus Borges Teixeira<br/>
                GNU Affero General Public License v3.0
              </p>

              <p>
                <a href={'https://github.com/matheuscodes/aaa-languages'}>Advanced Archery Application Translations</a><br/>
                Copyright © 2020 Several Collaborators<br/>
                MIT License
              </p>

              <p>
                Advanced Archery Application Server Code<br/>
                Copyright © 2015-2020 Matheus Borges Teixeira<br/>
                Closed Source, all rights reserved
              </p>

              <p>
                <a href={'http://www.bb-bogenschiessen.de/download/BB-Trainingsbericht/'}>Trainingsbericht v10.2.9</a><br/>
                Copyright © 2006-2015 Holger Hüning (Trainer BSC BB-Berlin e.V.)<br/>
                All Rights Reserved
              </p>

              <p>
                <a href={'http://www.material-ui.com'}>Material UI</a><br/>
                Copyright © 2020 Call-Em-All<br/>
                MIT License
              </p>

              <p>
                <a href={'https://material.io/'}>Material Design & Material Design Icons</a><br/>
                Copyright © 2012 Google<br/>
                Apache License Version 2.0
              </p>
            <Typography variant="subtitle1" gutterBottom>Stand: 13.05.2020</Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withTranslation('terms')(withStyles(styles)(TermsPage));
