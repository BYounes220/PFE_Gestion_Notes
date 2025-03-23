from rest_framework import serializers
from insc_reeinsc_admin.entities.Module import Module


class ModuleSerializer(serializers.ModelSerializer):
    note = serializers.SerializerMethodField()
    class Meta:
        model= Module
        fields= ["nom_module","note"]

    def get_note(self,obj):
        note = self.context.get("note", None)
        if note is not None:
            return f"{note}"
        return "No note provided for {obj.nom_module}"