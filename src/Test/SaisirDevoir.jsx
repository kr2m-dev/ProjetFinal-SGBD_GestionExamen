import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SaisieDevoir() {
  const [sections, setSections] = useState([
    { id: 1, titre: "", description: "" },
  ]);

  const ajouterSection = () => {
    setSections([...sections, { id: sections.length + 1, titre: "", description: "" }]);
  };

  const handleChange = (index, field, value) => {
    const newSections = [...sections];
    newSections[index][field] = value;
    setSections(newSections);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <h2 className="text-2xl font-semibold text-center mb-4">Saisie des parties du devoir</h2>

      {sections.map((section, index) => (
        <Card key={section.id} className="mb-4">
          <CardHeader>
            <CardTitle>Partie {index + 1}</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              type="text"
              placeholder="Titre de la partie"
              value={section.titre}
              onChange={(e) => handleChange(index, "titre", e.target.value)}
              className="mb-2"
            />
            <Textarea
              placeholder="Description de la partie"
              value={section.description}
              onChange={(e) => handleChange(index, "description", e.target.value)}
              className="mb-2"
            />
          </CardContent>
        </Card>
      ))}

      <div className="flex justify-center">
        <Button onClick={ajouterSection} className="mt-4">
          + Ajouter une Partie
        </Button>
      </div>
    </div>
  );
}
