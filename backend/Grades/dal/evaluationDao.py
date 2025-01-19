from Grades.Entities.evaluation import Evaluation

class EvaluationDao:
    @classmethod
    def get(cls,**kwargs):
        try:
          evaluation = Evaluation.objects.get(pk=kwargs['pk'])
          return evaluation
        except Evaluation.DoesNotExist:
            return None