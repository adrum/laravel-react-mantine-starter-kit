declare namespace App.Enums {
export type Language = 'en' | 'en_PH';
}
declare namespace Module.Kanban.DTOs {
export type BoardData = {
id: number;
title: string;
};
export type ColumnData = {
title: string;
boardData: Module.Kanban.DTOs.BoardData;
};
}
